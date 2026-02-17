let t=()=>fetch("http://localhost:3000/students").then(t=>t.json()),e=document.querySelector("tbody"),n=document.querySelector("#get-students-btn"),a=document.getElementById("add-student-form"),l=null;function s(t){e.innerHTML=t.map(({id:t,name:e,age:n,course:a,skills:l,email:s,isEnrolled:d})=>`
      <tr data-id="${t}">
        <td>${t}</td>
        <td>${e}</td>
        <td>${n}</td>
        <td>${a}</td>
        <td>${l}</td>
        <td>${s}</td>
        <td>${d?"Активний":"Неактивний"}</td>
        <td>
          <button type="button" data-action="delete">\u{412}\u{438}\u{434}\u{430}\u{43B}\u{438}\u{442}\u{438}</button>
          <button type="button" data-action="edit">\u{420}\u{435}\u{434}\u{430}\u{433}\u{443}\u{432}\u{430}\u{442}\u{438}</button>
        </td>
      </tr>
    `).join("")}async function d(e){e.preventDefault();let n=e.currentTarget.elements,d={name:n.name.value.trim(),age:n.age.value.trim(),course:n.course.value.trim(),skills:n.skills.value.trim(),email:n.email.value.trim(),isEnrolled:n.isEnrolled.checked};if(l){var o;await (o=l,fetch(`http://localhost:3000/students/${o}`,{method:"PUT",body:JSON.stringify(d),headers:{"Content-Type":"application/json; charset=UTF-8"}}).then(t=>t.json())),l=null}else await fetch("http://localhost:3000/students",{method:"POST",body:JSON.stringify(d),headers:{"Content-Type":"application/json; charset=UTF-8"}}).then(t=>t.json());s(await t()),a.reset()}n.addEventListener("click",async()=>{s(await t())}),a.addEventListener("submit",d),e.addEventListener("click",async e=>{let n=e.target.dataset.action;if(!n)return;let d=e.target.closest("tr"),o=d.dataset.id;"delete"===n&&(await fetch(`http://localhost:3000/students/${o}`,{method:"DELETE"}).then(t=>t.json()),s(await t()));if("edit"===n){l=o;let t=d.children;a.elements.name.value=t[1].textContent,a.elements.age.value=t[2].textContent,a.elements.course.value=t[3].textContent,a.elements.skills.value=t[4].textContent,a.elements.email.value=t[5].textContent,a.elements.isEnrolled.checked="Активний"===t[6].textContent}});
//# sourceMappingURL=hw-crud.6d1dae5a.js.map
