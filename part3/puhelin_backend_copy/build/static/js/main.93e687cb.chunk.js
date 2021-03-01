(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{38:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var r=t(3),c=t(0),o=t(2),a=t(14),u=t.n(a),i=t(4),s=t.n(i),l="/api/persons",d={getAll:function(){return s.a.get(l).then((function(e){return e.data}))},create:function(e){return s.a.post(l,e).then((function(e){return e.data}))},remove:function(e){return s.a.delete("".concat(l,"/").concat(e)).then((function(e){return e.data}))},update:function(e,n){return s.a.put("".concat(l,"/").concat(e),n).then((function(e){return e.data}))}},f=(t(38),function(e){var n=e.person,t=e.removePerson;return Object(c.jsx)("button",{onClick:function(){return t(n)},children:"delete"})}),j=function(e){var n=e.persons,t=e.filterValue,r=e.removePerson;return""!==t&&(n=n.filter((function(e){return e.name.toLowerCase().match(t.toLowerCase())}))),Object(c.jsx)("div",{children:n.map((function(e){return Object(c.jsxs)("p",{children:[e.name," ",e.number," ",Object(c.jsx)(f,{person:e,removePerson:r})," "]},e.id)}))})},h=function(e){var n=e.handleFilterChange,t=e.filterValue;return Object(c.jsx)("form",{children:Object(c.jsxs)("div",{children:["filter shown with ",Object(c.jsx)("input",{value:t,onChange:n})]})})},m=function(e){var n=e.addPerson,t=e.handlePersonChange,r=e.handleNumberChange,o=e.newName,a=e.newNumber;return Object(c.jsxs)("form",{onSubmit:n,children:[Object(c.jsxs)("div",{children:["name: ",Object(c.jsx)("input",{value:o,onChange:t})]}),Object(c.jsxs)("div",{children:["number: ",Object(c.jsx)("input",{value:a,onChange:r})]}),Object(c.jsx)("div",{children:Object(c.jsx)("button",{type:"submit",children:"add"})})]})},b=function(e){var n=e.message;return""===n?null:Object(c.jsx)("div",{className:"error",children:n})},v=function(e){var n=e.message;return null===n?null:Object(c.jsx)("div",{className:"msg",children:n})},O=function(){var e=Object(o.useState)([]),n=Object(r.a)(e,2),t=n[0],a=n[1],u=Object(o.useState)(""),i=Object(r.a)(u,2),s=i[0],l=i[1],f=Object(o.useState)(""),O=Object(r.a)(f,2),g=O[0],p=O[1],x=Object(o.useState)(""),w=Object(r.a)(x,2),C=w[0],P=w[1],N=Object(o.useState)(""),S=Object(r.a)(N,2),T=S[0],y=S[1],k=Object(o.useState)(null),V=Object(r.a)(k,2),A=V[0],E=V[1];Object(o.useEffect)((function(){d.getAll().then((function(e){a(e)})).catch((function(e){y("unable to retrieve data from server"),setTimeout((function(){y("")}),3e3)}))}),[]);return Object(c.jsxs)("div",{children:[Object(c.jsx)("h2",{children:"Phonebook"}),Object(c.jsx)(b,{message:T}),Object(c.jsx)(v,{message:A}),Object(c.jsx)(h,{handleFilterChange:function(e){console.log(e.target.value),P(e.target.value)},filterValue:C}),Object(c.jsx)("h3",{children:"add a new"}),Object(c.jsx)(m,{addPerson:function(e){if(e.preventDefault(),t.filter((function(e){return e.name===s})).length>0){if(window.confirm("".concat(s," is already added to phonebook, replace the old number with a new one?"))){var n=t.filter((function(e){return e.name===s}))[0],r={name:s,number:g,id:n.id};d.update(n.id,r).then((function(e){console.log(e),a(t.map((function(t){return t.id!==n.id?t:e}))),E("Changed the number of ".concat(n.name," succesfully")),setTimeout((function(){E(null)}),3e3)})).catch((function(e){y("Information of ".concat(n.name," has already been removed from the server")),a(t.filter((function(e){return e.id!==n.id}))),setTimeout((function(){y("")}),3e3)}))}}else{var c={name:s,number:g};d.create(c).then((function(e){a(t.concat(e)),E("Added ".concat(c.name)),setTimeout((function(){E(null)}),3e3),window.location.reload(!1)})).catch((function(e){y("Error validating new data"),setTimeout((function(){y("")}),3e3)}))}l(""),p("")},handlePersonChange:function(e){l(e.target.value)},handleNumberChange:function(e){p(e.target.value)},newNumber:g,newName:s}),Object(c.jsx)("h3",{children:"Numbers"}),Object(c.jsx)(j,{persons:t,filterValue:C,removePerson:function(e){window.confirm("delete ".concat(e.name,"?"))&&d.remove(e.id).then((function(n){a(t.filter((function(n){return n.id!==e.id}))),E("Removed ".concat(e.name)),setTimeout((function(){E(null)}),3e3),window.location.reload(!1)})).catch((function(n){y("Person ".concat(s," was already removed")),a(t.filter((function(n){return n.id!==e.id}))),setTimeout((function(){y("")}),3e3)}))}})]})};u.a.render(Object(c.jsx)(O,{}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.93e687cb.chunk.js.map