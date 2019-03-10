package personal.jeremyxu.filter;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;

public class TryFilesFilter implements Filter
{
    public static final String FILES_INIT_PARAM = "files";
    public static final String EXCLUDES_INIT_PARAM = "excludes";

    private String[] files;
    private String[] excludes = new String[0];
    private ServletContext servletContext;

    @Override
    public void init(FilterConfig config) throws ServletException
    {
        String param = config.getInitParameter(FILES_INIT_PARAM);
        if (param == null)
            throw new ServletException(String.format("Missing mandatory parameter '%s'", FILES_INIT_PARAM));
        files = param.split(" ");
        param = config.getInitParameter(EXCLUDES_INIT_PARAM);
        if(param != null){
            excludes = param.split(" ");
        }
        this.servletContext = config.getServletContext();
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException
    {
        HttpServletRequest httpRequest = (HttpServletRequest)request;
        HttpServletResponse httpResponse = (HttpServletResponse)response;

        //处理忽略的请求
        String path = httpRequest.getServletPath();
        String info = httpRequest.getPathInfo();
        if (info != null)
            path += info;
        if (!path.startsWith("/"))
            path = "/" + path;
        for(String exclude :excludes){
            if(path.startsWith(exclude)){
                chain.doFilter(httpRequest, httpResponse);
                return;
            }
        }

        for (int i = 0; i < files.length - 1; ++i)
        {
            String file = files[i];
            String resolved = resolve(httpRequest, file);

            URL url = this.servletContext.getResource(resolved);
            if (url == null)
                continue;

            chain.doFilter(httpRequest, httpResponse);
            return;
        }

        // The last one is the fallback
        fallback(httpRequest, httpResponse, chain, files[files.length - 1]);
    }

    private File toFile(URL url) throws IOException
    {
        try
        {
            return new File(url.toURI());
        }
        catch (URISyntaxException x)
        {
            throw new IOException(x);
        }
    }

    protected void fallback(HttpServletRequest request, HttpServletResponse response, FilterChain chain, String fallback) throws IOException, ServletException
    {
        String resolved = resolve(request, fallback);
        this.servletContext.getRequestDispatcher(resolved).forward(request, response);
    }

    private String resolve(HttpServletRequest request, String value)
    {
        String path = request.getServletPath();
        String info = request.getPathInfo();
        if (info != null)
            path += info;
        if (!path.startsWith("/"))
            path = "/" + path;
        return value.replaceAll("\\$path", path);
    }

    @Override
    public void destroy()
    {
    }
}