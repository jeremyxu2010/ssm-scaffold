<template>
  <div class="panel panel-primary" style="maxWidth: 800px; margin: 10px auto 10px;">
    <div class="panel-heading">
        Demo <el-button @click="changeLocale">{{$t('label.changeLocale')}}</el-button>
    </div>
    <div class="panel-body">
        <el-form :inline="true" class="demo-form-inline">
            <el-row>
                <el-col :span="8">
                    <el-form-item :label="$t('label.name')">
                        <el-input v-model="name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item :label="$t('label.age')">
                        <el-input v-model="age"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item :label="$t('label.address')">
                        <el-input v-model="address"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :offset="16" :span="8">
                    <el-button @click="addUser">{{$t('label.add')}}</el-button>
                    <el-button @click="loadUsers">{{$t('label.search')}}</el-button>
                </el-col>
            </el-row>
        </el-form>
        <el-table v-loading="loading"
                :data="users"
                style="width: 100%; margin: 10px 0px;">
            <el-table-column
                    prop="name"
                    :label="$t('label.name')">
            </el-table-column>
            <el-table-column
                    prop="age"
                    :label="$t('label.age')">
            </el-table-column>
            <el-table-column
                    prop="address"
                    :label="$t('label.address')">
            </el-table-column>
        </el-table>
        <el-pagination align="right"
                layout="prev, pager, next, total, sizes"
                :total="total" :page-sizes="[5, 10, 20, 40]"  :current-page="page" @current-change="pageChanged"  :page-size="pageSize" @size-change="pageSizeChanged">
        </el-pagination>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { mapState } from 'vuex'
  import {isBlank, isInteger} from '../utils/CommonUtil'
  import {ACTION_LOAD_USERS, ACTION_ADD_USER} from '../constants/UserConstant'
  import {ACTION_CHANGE_LOCALE} from '../constants/LocaleConstant'

  const INIT_PAGE_SIZE = 5;

  export default {
      name : 'UserComponent',

      data : function(){
          return {
              name: '',
              age: '',
              address: '',
              page: 1,
              pageSize: INIT_PAGE_SIZE,
              loading: false
          };
      },

      computed : {
        ...mapState({
            users : state => state.userStore.users,
            total: state => state.userStore.total,
            errMsg: state => state.userStore.errMsg
        })
      },

      mounted(){
          this.loadUsers();
      },

      beforeUpdate(){
        if(!isBlank(this.errMsg)){
          this.$message.error(this.errMsg);
        }
      },

      methods : {
          changeLocale : function(){
              this.$store.dispatch(ACTION_CHANGE_LOCALE);
          },
          addUser : function(){
              if (isBlank(this.name)) {
                  this.$message.error(this.$t('validate.nameIsEmpty'));
                  return;
              }

              if (isBlank(this.age)) {
                  this.$message.error(this.$t('validate.ageIsEmpty'));
                  return;
              }

              if (!isInteger(this.age)) {
                  this.$message.error(this.$t('validate.ageIsInvalid'));
                  return;
              }

              if (isBlank(this.address)) {
                  this.$message.error(this.$t('validate.addressIsEmpty'));
                  return;
              }

              this.$store.dispatch(ACTION_ADD_USER, {name: this.name, age: parseInt(this.age || 0, 10), address: this.address}).then(() => {
                  this.name = '';
                  this.age = '';
                  this.address = '';
                  this.page = 1;
                  this.loadUsers();
              });
          },
          loadUsers : function(){
              this.loading = true;
              let filters = {};
              if (!isBlank(this.name)) {
                  filters.name = this.name;
              }

              if (!isBlank(this.age) && isInteger(this.age)) {
                  filters.age = parseInt(this.age || 0, 10);
              }

              if (!isBlank(this.address)) {
                  filters.address = this.address;
              }
              this.$store.dispatch(ACTION_LOAD_USERS, {page: this.page, pageSize: this.pageSize, filters: filters}).then(() => {
                this.loading = false;
              });
          },
          pageChanged: function(page){
              this.page = page;
              this.loadUsers();
          },
          pageSizeChanged: function(pageSize){
              this.page = 1;
              this.pageSize = pageSize;
              this.loadUsers();
          }
      }
  }

</script>
