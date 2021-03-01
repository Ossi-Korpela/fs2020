(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{38:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var r=t(3),c=t(0),a=t(2),o=t(14),u=t.n(o),i=t(4),s=t.n(i),l="/api/persons",d={getAll:function(){return s.a.get(l).then((function(e){return e.data}))},create:function(e){return s.a.post(l,e).then((function(e){return e.data}))},remove:function(e){return s.a.delete("".concat(l,"/").concat(e)).then((function(e){return e.data}))},update:function(e,n){return s.a.put("".concat(l,"/").concat(e),n).then((function(e){return e.data}))}},f=(t(38),function(e){var n=e.person,t=e.removePerson;return Object(c.jsx)("button",{onClick:function(){return t(n)},children:"delete"})}),j=function(e){var n=e.persons,t=e.filterValue,r=e.removePerson;return""!==t&&(n=n.filter((function(e){return e.name.toLowerCase().match(t.toLowerCase())}))),Object(c.jsx)("div",{children:n.map((function(e){return Object(c.jsxs)("p",{children:[e.name," ",e.number," ",Object(c.jsx)(f,{person:e,removePerson:r})," "]},e.id)}))})},h=function(e){var n=e.handleFilterChange,t=e.filterValue;return Object(c.jsx)("form",{children:Object(c.jsxs)("div",{children:["filter shown with ",Object(c.jsx)("input",{value:t,onChange:n})]})})},m=function(e){var n=e.addPerson,t=e.handlePersonChange,r=e.handleNumberChange,a=e.newName,o=e.newNumber;return Object(c.jsxs)("form",{onSubmit:n,children:[Object(c.jsxs)("div",{children:["name: ",Object(c.jsx)("input",{value:a,onChange:t})]}),Object(c.jsxs)("div",{children:["number: ",Object(c.jsx)("input",{value:o,onChange:r})]}),Object(c.jsx)("div",{children:Object(c.jsx)("button",{type:"submit",children:"add"})})]})},b=function(e){var n=e.message;return""===n?null:Object(c.jsx)("div",{className:"error",children:n})},O=function(e){var n=e.message;return null===n?null:Object(c.jsx)("div",{className:"msg",children:n})},v=function(){var e=Object(a.useState)([]),n=Object(r.a)(e,2),t=n[0],o=n[1],u=Object(a.useState)(""),i=Object(r.a)(u,2),s=i[0],l=i[1],f=Object(a.useState)(""),v=Object(r.a)(f,2),g=v[0],p=v[1],x=Object(a.useState)(""),w=Object(r.a)(x,2),C=w[0],P=w[1],N=Object(a.useState)(""),S=Object(r.a)(N,2),T=S[0],y=S[1],k=Object(a.useState)(null),V=Object(r.a)(k,2),A=V[0],I=V[1];Object(a.useEffect)((function(){d.getAll().then((function(e){o(e)})).catch((function(e){y("unable to retrieve data from server"),setTimeout((function(){y("")}),3e3)}))}),[]);return Object(c.jsxs)("div",{children:[Object(c.jsx)("h2",{children:"Phonebook"}),Object(c.jsx)(b,{message:T}),Object(c.jsx)(O,{message:A}),Object(c.jsx)(h,{handleFilterChange:function(e){console.log(e.target.value),P(e.target.value)},filterValue:C}),Object(c.jsx)("h3",{children:"add a new"}),Object(c.jsx)(m,{addPerson:function(e){if(e.preventDefault(),t.filter((function(e){return e.name===s})).length>0){if(window.confirm("".concat(s," is already added to phonebook, replace the old number with a new one?"))){var n=t.filter((function(e){return e.name===s}))[0],r={name:s,number:g,date:n.date,id:n.id};d.update(n.id,r).then((function(e){console.log(e),o(t.map((function(t){return t.id!==n.id?t:e}))),I("Changed the number of ".concat(n.name," succesfully")),setTimeout((function(){I(null)}),3e3)})).catch((function(e){y("Information of ".concat(n.name," has already been removed from the server")),o(t.filter((function(e){return e.id!==n.id}))),setTimeout((function(){y("")}),3e3)}))}}else{for(var c=0,a=function(){t.filter((function(e){return e.id===c}))};a.length>0;)c+=1;var u={name:s,number:g,date:(new Date).toISOString(),id:c};d.create(u).then((function(e){o(t.concat(e)),I("Added ".concat(u.name)),setTimeout((function(){I(null)}),3e3)})).catch((function(e){y(e.response.data),setTimeout((function(){y("")}),3e3)}))}l(""),p("")},handlePersonChange:function(e){l(e.target.value)},handleNumberChange:function(e){p(e.target.value)},newNumber:g,newName:s}),Object(c.jsx)("h3",{children:"Numbers"}),Object(c.jsx)(j,{persons:t,filterValue:C,removePerson:function(e){window.confirm("delete ".concat(e.name,"?"))&&d.remove(e.id).then((function(n){o(t.filter((function(n){return n.id!==e.id}))),I("Removed ".concat(e.name)),setTimeout((function(){I(null)}),3e3)})).catch((function(n){y("Person ".concat(s," was already removed")),o(t.filter((function(n){return n.id!==e.id}))),setTimeout((function(){y("")}),3e3)}))}})]})};u.a.render(Object(c.jsx)(v,{}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.0f1c166b.chunk.js.map