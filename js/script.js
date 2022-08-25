const listadoJobs = document.querySelector(".job-listing");
const listaFiltro = document.querySelector(".filter-list");
const clearBtn = document.querySelector(".clear-btn");
let filters = [];



const toHTML = (data) => {
  return `
  <div class="vacancy ${data.featured ? "top" : ""}">
  <div class="main-content">
    <div class="logo">
      <img src="${data.logo}" alt="${data.company}">
    </div>
    <div class="main-content__text">
      <div class="company">
        <h4 class="company__name">${data.company}</h4>
        <span class="tag new ${data.new}">New!</span>
        <span class="tag featured ${data.featured}">Featured</span>
      </div>
      <div class="role">
        <h3>${data.position}</h3>
      </div>
      <div class="about-job">
        <span>${data.postedAt}</span>
        <span>${data.contract}</span>
        <span>${data.location}</span>
      </div>
    </div>
  </div>
  <div class="categories">
    <div class="filter" data-role="${data.role}">${data.role}</div>
    <div class="filter" data-level="${data.level}">${data.level}</div>
    ${dataLanguagesToHTML(data.languages)}
    ${dataToolsHTML(data.tools)}
  </div>
  </div>
  `;
};

const dataLanguagesToHTML = (arr) => {
  if (!arr) return "";
  const html = arr
    .map(
      (lang) => `<div class = 'filter' data-languages='${lang}'>${lang}</div>`
    )
    .join("");
  return html;
};

const dataToolsHTML = (arr) => {
  if (!arr) return "";
  const tool = arr
    .map((tool) => `<div class='filter' data-tools=${tool}>${tool}</div>`)
    .join("");
  return tool;
};

const render = (data) => {
  const html = data.map(toHTML).join("");
  document.querySelector(".job-listing").innerHTML = html;
};

render(jobs);

//Filtros
const addFiltros = (filter) => {
  document.querySelector(".filter-field").classList.add("active");

  const html = `
  <div class="filters">
  <div class="filter__name">${filter}</div>
  <div class="remove-btn"><img src="images/icon-remove.svg" alt="remove" data-remove="remove"></div>
</div>`;
  listaFiltro.insertAdjacentHTML('beforeend',html)
};

const filtrarLista = (arrFiltros, data) => {
  const newData = data.filter((valor) => {
    let arrayFilterValues = [
      valor.role,
      valor.level,
      ...(valor.languages || []),
      ...(valor.tools || []),
    ];
    return arrFiltros.every((item) => arrayFilterValues.includes(item));
  });
  console.log(newData);
  render(newData);
};

listadoJobs.addEventListener("click", (e) => {
  e.preventDefault();

  if (
    e.target.dataset.languages ||
    e.target.dataset.role ||
    e.target.dataset.level ||
    e.target.dataset.tools
  ) {
    if (!filters.includes(e.target.textContent)) {
      addFiltros(e.target.textContent);
      filters.push(e.target.textContent);
      //  console.log(filters)
      filtrarLista(filters, jobs);
    }
  }
});


const removeFilter = (elem, filterName)=>{
  filters = filters.filter(value => value !== filterName)

  listaFiltro.removeChild(elem)

  if(filters.length <= 0){
    document.querySelector('.filter-field').classList.remove('active')
    render(jobs)
  }else{
    filtrarLista(filters, jobs)
  }
}

listaFiltro.addEventListener('click',(e)=>{
  e.preventDefault()

  if(e.target.dataset.remove){
    let node = e.target.parentNode.parentNode
    let removeFiltroName = node.querySelector('.filter__name').textContent

    removeFilter(node,removeFiltroName)
  }

})

clearBtn.addEventListener('click',(e) =>{
  e.preventDefault()


  filters.length = 0
  document.querySelector('.filter-field').classList.remove('active')
  listaFiltro.innerHTML = ''
  render(jobs)

})