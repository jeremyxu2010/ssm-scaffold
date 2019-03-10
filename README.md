# ssm-scaffold
这是一个SpringMVC+Mybatis 脚手架，方便平时的开发使用，也可作为新手的学习项目。

## 运行
这个一个maven Web工程，因此直接用IDEA或eclipse导入工程，然后执行以下几步：

1. 确保本机正确地安装了JDK7，NodeJS
2. 执行命令`npm install -g yarn`安装yarn以替代npm
3. 在工程根目录下执行`mvn package`完成war的构建，构建过程中会自动编译前端代码，并将编译后的静态资源文件打入war包，并会将打好的war包拷贝到`dockerfiles/wars`目录
4. 将`dockerfiles`目录拷贝至docker引擎所在服务器，然后在该目录下执行`docker-compose up`，将会启动两个docker容器，一个跑mysql, 一个跑jetty
5. 使用浏览器访问`http://${docker_host_ip}:8080`

## 开发
开发时如果每次都是生产编译肯定很好耗时，所以开发时建议使用前端开发Web服务器，使用方法如下：

1. 使用IDE将该Web工程部署到tomcat上运行，注意Web应用的context-path设置为"/"，假设tomcat的端口为8080
2. 打开命令行，切换到src/main/frontend_react目录，执行 `npm run start` 启动开发Web服务器
3. 使用浏览器访问`http://127.0.0.1:3000`

## 更新
* 使用docker简化应用分发过程
* maven的pom.xml文件中加入自动编译前端代码及将编译后的静态资源文件打入war的步骤
* 使用[create-react-app](https://github.com/facebookincubator/create-react-app/)来完成前端代码的构建，约定大于配置，不再需要手工写gulp脚本真好
* 用vuejs + vuex做了一个新的前端实现
* 用react+redux做了个简单的示例前端，前端使用gulp+browserify+babel编译javascript。

##依赖
 - Spring:4.2.1.RELEASE
 - mybatis:3.3.0
 - mybatis-spring:1.2.3
 - druid:1.0.15
 - fastjson:1.2.7
 - mybatis-generator:1.3.2
 - slf4j:1.7.12
 - log4j:1.2.17

数据库默认使用了mysql，依赖
 - mysql-connection-java:5.1.6

这些能在pom.xml的顶部快速找到，直接修改：

	<properties>
        <junit-version>3.8.1</junit-version>
        <spring-version>4.2.1.RELEASE</spring-version>
        <mybatis-version>3.3.0</mybatis-version>
        <mybatis-spring-version>1.2.3</mybatis-spring-version>
        <druid-version>1.0.15</druid-version>
        <fastjson-version>1.2.7</fastjson-version>
        <mysql-connection-version>5.1.6</mysql-connection-version>
        <mybatis-generator-version>1.3.2</mybatis-generator-version>
        <slf4j-version>1.7.12</slf4j-version>
        <log4j-version>1.2.17</log4j-version>
    </properties>

## 配置说明
 - applicationContext.xml:Spring 主配置文件
 - generator.properties:Mybatis-generator 配置文件
 - generatorConfig.xml:Mybatis-generator 配置文件
 - jdbc.properties:jdbc配置文件，将外部配置文件放置于/external/jdbc_overwrite.properties即可覆盖默认配置文件
 - log4j.properties:log4j 配置文件，使用-Dlog4j.configuration=file:[path-to-your-external-file]指定外部log4j配置文件
 - spring/db.xml:Spring数据库相关配置文件
 - spring/mvc.xml:SpringMVC配置文件

##快速上手
http://1994.github.io/2015/10/14/ssm-scaffold/