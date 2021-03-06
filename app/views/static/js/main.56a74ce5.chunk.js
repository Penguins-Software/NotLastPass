(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{38:function(e,s,t){},63:function(e,s,t){"use strict";t.r(s);var a=t(1),n=t(30),r=t.n(n),c=t(13),o=t(9),i=t(10),d=t(12),l=t(11),u=t(3),b=(t(37),t(38),t(2)),h=t(31),j=t.n(h).a.create({baseURL:"http://localhost:8081/api",headers:{"Content-type":"application/json"}}),m=new(function(){function e(){Object(o.a)(this,e)}return Object(i.a)(e,[{key:"getAll",value:function(){return j.get("/passwords")}},{key:"get",value:function(e){return j.get("/passwords/".concat(e))}},{key:"create",value:function(e){return j.post("/passwords",e)}},{key:"update",value:function(e,s){return j.put("/passwords/".concat(e),s)}},{key:"delete",value:function(e){return j.delete("/passwords/".concat(e))}},{key:"deleteAll",value:function(){return j.delete("/passwords")}},{key:"findByWebsite",value:function(e){return j.get("/passwords?website=".concat(e))}},{key:"findByUsername",value:function(e){return j.get("/passwords?username=".concat(e))}}]),e}()),w=t(0),v=function(e){Object(d.a)(t,e);var s=Object(l.a)(t);function t(e){var a;return Object(o.a)(this,t),(a=s.call(this,e)).onChangeWebsite=a.onChangeWebsite.bind(Object(b.a)(a)),a.onChangeUsername=a.onChangeUsername.bind(Object(b.a)(a)),a.onChangePassword=a.onChangePassword.bind(Object(b.a)(a)),a.savePassword=a.savePassword.bind(Object(b.a)(a)),a.newPassword=a.newPassword.bind(Object(b.a)(a)),a.state={id:null,website:"",username:"",password:"",submitted:!1},a}return Object(i.a)(t,[{key:"onChangeWebsite",value:function(e){this.setState({website:e.target.value})}},{key:"onChangeUsername",value:function(e){this.setState({username:e.target.value})}},{key:"onChangePassword",value:function(e){this.setState({password:e.target.value})}},{key:"savePassword",value:function(){var e={website:this.state.website,username:this.state.username,password:this.state.password};m.create(JSON.stringify(e)).catch((function(e){console.log(e)}))}},{key:"newPassword",value:function(){this.setState({id:null,website:"",username:"",password:"",submitted:!1})}},{key:"render",value:function(){return Object(w.jsx)("div",{className:"submit-form",children:this.state.submitted?Object(w.jsxs)("div",{children:[Object(w.jsx)("h4",{children:"You submitted successfully!"}),Object(w.jsx)("button",{className:"btn btn-success",onClick:this.newPassword,children:"Add"})]}):Object(w.jsxs)("div",{children:[Object(w.jsxs)("div",{className:"form-group",children:[Object(w.jsx)("label",{htmlFor:"website",children:"website"}),Object(w.jsx)("input",{type:"text",className:"form-control",id:"website",required:!0,value:this.state.website,onChange:this.onChangeWebsite,name:"website"})]}),Object(w.jsxs)("div",{className:"form-group",children:[Object(w.jsx)("label",{htmlFor:"username",children:"username"}),Object(w.jsx)("input",{type:"text",className:"form-control",id:"username",required:!0,value:this.state.username,onChange:this.onChangeUsername,name:"username"})]}),Object(w.jsxs)("div",{className:"form-group",children:[Object(w.jsx)("label",{htmlFor:"password",children:"password"}),Object(w.jsx)("input",{type:"text",className:"form-control",id:"password",required:!0,value:this.state.password,onChange:this.onChangePassword,name:"password"})]}),Object(w.jsx)("button",{onClick:this.savePassword,className:"btn btn-success",children:"Submit"})]})})}}]),t}(a.Component),O=t(15),p=function(e){Object(d.a)(t,e);var s=Object(l.a)(t);function t(e){var a;return Object(o.a)(this,t),(a=s.call(this,e)).onChangeWebsite=a.onChangeWebsite.bind(Object(b.a)(a)),a.onChangeUsername=a.onChangeUsername.bind(Object(b.a)(a)),a.onChangePassword=a.onChangePassword.bind(Object(b.a)(a)),a.getPassword=a.getPassword.bind(Object(b.a)(a)),a.updatePassword=a.updatePassword.bind(Object(b.a)(a)),a.deletePassword=a.deletePassword.bind(Object(b.a)(a)),a.state={currentPassword:{id:null,website:"",username:"",password:""},message:""},a}return Object(i.a)(t,[{key:"componentDidMount",value:function(){this.getPassword(this.props.match.params.id)}},{key:"onChangeWebsite",value:function(e){var s=e.target.value;this.setState((function(e){return{currentPassword:Object(O.a)(Object(O.a)({},e.currentPassword),{},{website:s})}}))}},{key:"onChangeUsername",value:function(e){var s=e.target.value;this.setState((function(e){return{currentPassword:Object(O.a)(Object(O.a)({},e.currentPassword),{},{username:s})}}))}},{key:"onChangePassword",value:function(e){var s=e.target.value;this.setState((function(e){return{currentPassword:Object(O.a)(Object(O.a)({},e.currentPassword),{},{password:s})}}))}},{key:"getPassword",value:function(e){var s=this;m.get(e).then((function(e){s.setState({currentPassword:e.data}),console.log(e.data)})).catch((function(e){console.log(e)}))}},{key:"updatePassword",value:function(){var e=this;m.update(this.state.currentPassword.id,this.state.currentPassword).then((function(s){console.log(s.data),e.setState({message:"The password was updated successfully!"})})).catch((function(e){console.log(e)}))}},{key:"deletePassword",value:function(){var e=this;m.delete(this.state.currentPassword.id).then((function(s){console.log(s.data),e.props.history.push("/passwords")})).catch((function(e){console.log(e)}))}},{key:"render",value:function(){var e=this.state.currentPassword;return Object(w.jsx)("div",{children:e?Object(w.jsxs)("div",{className:"edit-form",children:[Object(w.jsx)("h4",{children:"Password"}),Object(w.jsxs)("form",{children:[Object(w.jsxs)("div",{className:"form-group",children:[Object(w.jsx)("label",{htmlFor:"website",children:"website"}),Object(w.jsx)("input",{type:"text",className:"form-control",id:"website",value:e.website,onChange:this.onChangeWebsite})]}),Object(w.jsxs)("div",{className:"form-group",children:[Object(w.jsx)("label",{htmlFor:"username",children:"username"}),Object(w.jsx)("input",{type:"text",className:"form-control",id:"username",value:e.username,onChange:this.onChangeUsername})]}),Object(w.jsxs)("div",{className:"form-group",children:[Object(w.jsx)("label",{htmlFor:"password",children:"password"}),Object(w.jsx)("input",{type:"password",className:"form-control",id:"password",value:e.password,onChange:this.onChangePassword})]})]}),Object(w.jsx)("button",{className:"badge badge-danger mr-2",onClick:this.deletePassword,children:"Delete"}),Object(w.jsx)("button",{type:"submit",className:"badge badge-success",onClick:this.updatePassword,children:"Update"}),Object(w.jsx)("p",{children:this.state.message})]}):Object(w.jsxs)("div",{children:[Object(w.jsx)("br",{}),Object(w.jsx)("p",{children:"Please click on a Password..."})]})})}}]),t}(a.Component),g=function(e){Object(d.a)(t,e);var s=Object(l.a)(t);function t(e){var a;return Object(o.a)(this,t),(a=s.call(this,e)).onChangeSearchWebsite=a.onChangeSearchWebsite.bind(Object(b.a)(a)),a.retrievePasswords=a.retrievePasswords.bind(Object(b.a)(a)),a.refreshList=a.refreshList.bind(Object(b.a)(a)),a.setActivePassword=a.setActivePassword.bind(Object(b.a)(a)),a.removeAllPasswords=a.removeAllPasswords.bind(Object(b.a)(a)),a.searchWebsite=a.searchWebsite.bind(Object(b.a)(a)),a.state={passwords:[],currentPassword:null,currentIndex:-1,searchWebsite:""},a}return Object(i.a)(t,[{key:"componentDidMount",value:function(){this.retrievePasswords()}},{key:"onChangeSearchWebsite",value:function(e){var s=e.target.value;this.setState({searchWebsite:s})}},{key:"retrievePasswords",value:function(){var e=this;m.getAll().then((function(s){e.setState({passwords:s.data}),console.log(s.data)})).catch((function(e){console.log(e)}))}},{key:"refreshList",value:function(){this.retrievePasswords(),this.setState({currentPassword:null,currentIndex:-1})}},{key:"setActivePassword",value:function(e,s){this.setState({currentPassword:e,currentIndex:s})}},{key:"removeAllPasswords",value:function(){var e=this;m.deleteAll().then((function(s){console.log(s.data),e.refreshList()})).catch((function(e){console.log(e)}))}},{key:"searchWebsite",value:function(){var e=this;this.setState({currentPassword:null,currentIndex:-1}),m.findByWebsite(this.state.searchWebsite).then((function(s){e.setState({passwords:s.data}),console.log(s.data)})).catch((function(e){console.log(e)}))}},{key:"render",value:function(){var e=this,s=this.state,t=s.searchWebsite,a=s.passwords,n=s.currentPassword,r=s.currentIndex;return Object(w.jsxs)("div",{className:"list row",children:[Object(w.jsx)("div",{className:"col-md-8",children:Object(w.jsxs)("div",{className:"input-group mb-3",children:[Object(w.jsx)("input",{type:"text",className:"form-control",placeholder:"Search by website",value:t,onChange:this.onChangeSearchWebsite}),Object(w.jsx)("div",{className:"input-group-append",children:Object(w.jsx)("button",{className:"btn btn-outline-secondary",type:"button",onClick:this.searchWebsite,children:"Search"})})]})}),Object(w.jsxs)("div",{className:"col-md-6",children:[Object(w.jsx)("h4",{children:"Passwords List"}),Object(w.jsx)("ul",{className:"list-group",children:a&&a.map((function(s,t){return Object(w.jsx)("li",{className:"list-group-item "+(t===r?"active":""),onClick:function(){return e.setActivePassword(s,t)},children:s.website},t)}))}),Object(w.jsx)("button",{className:"m-3 btn btn-sm btn-danger",onClick:this.removeAllPasswords,children:"Remove All"})]}),Object(w.jsx)("div",{className:"col-md-6",children:n?Object(w.jsxs)("div",{children:[Object(w.jsx)("h4",{children:"Password"}),Object(w.jsxs)("div",{children:[Object(w.jsx)("label",{children:Object(w.jsx)("strong",{children:"Website:"})})," ",n.website]}),Object(w.jsxs)("div",{children:[Object(w.jsx)("label",{children:Object(w.jsx)("strong",{children:"Username:"})})," ",n.username]}),Object(w.jsxs)("div",{children:[Object(w.jsx)("label",{children:Object(w.jsx)("strong",{children:"Password:"})})," ",n.password]}),Object(w.jsx)(c.b,{to:"/passwords/"+n.id,className:"badge badge-warning",children:"Edit"})]}):Object(w.jsxs)("div",{children:[Object(w.jsx)("br",{}),Object(w.jsx)("p",{children:"Please click on a Password..."})]})})]})}}]),t}(a.Component),f=function(e){Object(d.a)(t,e);var s=Object(l.a)(t);function t(){return Object(o.a)(this,t),s.apply(this,arguments)}return Object(i.a)(t,[{key:"render",value:function(){return Object(w.jsxs)("div",{children:[Object(w.jsxs)("nav",{className:"navbar navbar-expand navbar-dark bg-dark",children:[Object(w.jsx)("a",{href:"/passwords",className:"navbar-brand",children:"Penguins"}),Object(w.jsxs)("div",{className:"navbar-nav mr-auto",children:[Object(w.jsx)("li",{className:"nav-item",children:Object(w.jsx)(c.b,{to:"/passwords",className:"nav-link",children:"Passwords"})}),Object(w.jsx)("li",{className:"nav-item",children:Object(w.jsx)(c.b,{to:"/add",className:"nav-link",children:"Add"})})]})]}),Object(w.jsx)("div",{className:"container mt-3",children:Object(w.jsxs)(u.c,{children:[Object(w.jsx)(u.a,{exact:!0,path:["/","/passwords"],component:g}),Object(w.jsx)(u.a,{exact:!0,path:"/add",component:v}),Object(w.jsx)(u.a,{path:"/passwords/:id",component:p})]})})]})}}]),t}(a.Component),x=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,64)).then((function(s){var t=s.getCLS,a=s.getFID,n=s.getFCP,r=s.getLCP,c=s.getTTFB;t(e),a(e),n(e),r(e),c(e)}))};r.a.render(Object(w.jsx)(c.a,{children:Object(w.jsx)(f,{})}),document.getElementById("root")),x()}},[[63,1,2]]]);
//# sourceMappingURL=main.56a74ce5.chunk.js.map