/* 
En este ejercicio crearemos modelos de usuarios con de la siguiente manera
{
    nombre: string,
    apellido: string,
    telefono: string,
    email: string,
    genero: string (hombre | mujer),
}

*/
const rawUrlApi = 'https://6051a8e0fb49dc00175b6797.mockapi.io/'

const postUser = (e) => {
  e.preventDefault();
  //obtenemos el valor de nuestros campos de texto
  const body = getInputValues();

  //publicar los datos del formulario al mock api
  const functionResponse = createUser(body);
  functionResponse.then(result => {
    showResult(result);
    getUsers();
  });
};

const getUsers = async () => {
  //obtener los datos del back end, y guardarlos dentro de un array llamado data
  const divData = document.getElementById("data");
  const users = searchFromAPI('users');
  users.then(data => {
    divData.innerHTML = "";
    data.map((item, idx) => {
      const childDiv = document.createElement("div");
      const nombre = document.createElement("span");
      const apellido = document.createElement("span");
      const email = document.createElement("span");
      const telefono = document.createElement("span");
      const genero = document.createElement("span");
      nombre.innerText = "Nombre: " + item.nombre;
      apellido.innerText = "Apellido: " + item.apellido;
      email.innerText = "Correo: " + item.email;
      telefono.innerText = "Telefono: " + item.telefono;
      genero.innerText = "Género: " + item.genero;
      const deleteButton = document.createElement("button");
      deleteButton.innerText = "Eliminar";
      deleteButton.onclick = deleteFunc;
      deleteButton.id = item.id;
      childDiv.appendChild(nombre);
      childDiv.appendChild(apellido);
      childDiv.appendChild(email);
      childDiv.appendChild(telefono);
      childDiv.appendChild(genero);
      childDiv.appendChild(deleteButton);
      divData.appendChild(childDiv);
    });
  });
};

const deleteFunc = async (event) => {
  //usar la función fetch para eliminar un elemento, el id del elemnto debería estar guardado en el id del botón
  const id = event.path[0].id;
  const functionResponse = deleteUserByID(id);
  functionResponse.then(result => {
    showResult(result);
    getUsers();
  });
};

const cleanInputs = () => {
  const nombre = document.getElementById("nombre");
  const apellido = document.getElementById("apellido");
  const email = document.getElementById("email");
  const telefono = document.getElementById("telefono");

  nombre.value = "";
  apellido.value = "";
  email.value = "";
  telefono.value = "";
};

const getInputValues = () => {
  const body = {
    nombre: document.getElementById("nombre").value,
    apellido: document.getElementById("apellido").value,
    email: document.getElementById("email").value,
    telefono: document.getElementById("telefono").value,
    genero: document.getElementById("genero").value,
  };

  return body;
};

const searchFromAPI = async (endpoint) => {
  const url = rawUrlApi + endpoint;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const createUser = async (data) => {
  const url = rawUrlApi + 'users';
  try {
    const response = await fetch(url,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (response.status == 201) {
      return 'User sucessfully created.'
    } else {
      //console.log(response.status)
      return response
    };
    // returnedData = await response.json()
  } catch (error) {
    return 'Error';
  };
};

const deleteUserByID = async (id) => {
  const url = rawUrlApi + 'users/' + id;
  try {
    const response = await fetch(url,{
      method: 'DELETE',
    });
    if (response.status == 200) {
      return 'User sucessfully deleted.'
    } else {
      //console.log(response.status)
      return response
    };
    // returnedData = await response.json()
  } catch (error) {
    return 'Error';
  };
};

const showResult = (result) => {
  const bodyDiv = document.getElementsByTagName("body")[0];
  const childDiv = document.createElement("div");
  childDiv.id = "resultDiv";
  childDiv.innerText = result;
  bodyDiv.insertBefore(childDiv, bodyDiv.firstChild);

  //Remove created result div
  setTimeout(() => {
    bodyDiv.removeChild(childDiv);
  }, 2000);
};
