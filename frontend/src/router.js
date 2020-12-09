/********************************************************************************
 * Copyright (c) 2020 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0
 *
 * SPDX-License-Identifier: EPL-2.0
 ********************************************************************************/
import Vue from "vue"

import VueRouter from "vue-router"

import finder from "./components/finder"

import heapDump from "./components/heapdump/HeapDump"

import auth from "./components/auth/Auth"

import axios from "axios";

import notFound from "./components/404"

import VueInsatence from "./main"
import JifaGlobal from "./Jifa";

Vue.use(VueRouter)

const routes = [
  {
    name: 'finder',
    path: '/',
    component: finder
  },
  {
    name: 'auth',
    path: "/auth",
    component: auth
  },
  {
    name: 'heapDump',
    path: "/heapDump",
    component: heapDump,
    props: (route) => ({file: route.query.file})
  },
  {path: '*', component: notFound}
];

const router = new VueRouter({
  mode: 'history',
  routes
});

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  let resp = error.response
  if (resp) {
    let status = resp.status
    let data = resp.data
    if (status === 500 || status === 400 || status === 401 || status === 403) {
      if (data && data.hasOwnProperty('errorCode')) {
        if (data.errorCode === 'TRANSFER_ERROR') {
          // do nothing
        } else {
          VueInsatence.$notify.error({
            title: data.errorCode,
            message: data.message,
            offset: 100,
            duration: 0,
            showClose: true
          });
        }
      } else if (status === 401) {
        JifaGlobal.save_back_url(window.location.href)
        window.location.href = window.location.protocol + "//" +window.location.host + "/auth"
      }
    }
  }
  return Promise.reject(error);
});

export default router