 window.onload = function () {

            var localStorageKeyName = 'data';

            loadFromLocalStorage();

            document.querySelector("#btn-add").addEventListener('click', function () {
                var name = document.getElementById("name"),
                    age = document.getElementById("age");

                // Validar datos enviados
                if (name.value.length === 0 || !parseInt(age.value)) return;

                var user = {
                    name: name.value,
                    age: age.value
                };


                //limpiar las variables despues de agregar las variables en user
                name.value = '';
                age.value = '';

                // Append a localStorage
                appendObjectToLocalStorage(user);
            })

            function appendObjectToLocalStorage(obj) {

                var users = [],

                dataInLocalStorage = localStorage.getItem(localStorageKeyName);

                if (dataInLocalStorage !== null) {
                    users = JSON.parse(dataInLocalStorage);
                }

                //Agregar datos a users array

                users.push(obj);

                //Agregar en formato json arreglo a localstorage

                localStorage.setItem(localStorageKeyName, JSON.stringify(users));

                loadFromLocalStorage();
            }


            function loadFromLocalStorage() {
                var users = [],

                //array general
                    dataInLocalStorage = localStorage.getItem(localStorageKeyName);

                // Sacar tbody de la tabla

                    gridBody = document.querySelector("#grid tbody");

                    console.log(dataInLocalStorage);

                if (dataInLocalStorage !== null) {

                    // agregamos todos los usuarios a una variable con json parse
                    users = JSON.parse(dataInLocalStorage);

                    console.log(users);
                }

                // Dibujar tr en tbody

                gridBody.innerHTML = '';

                users.forEach(function (x, i) {
                    //variable tr
                    var tr = document.createElement("tr"),
                        tdName = document.createElement("td"),
                        tdAge = document.createElement("td"),
                        tdRemove = document.createElement("td"),
                        btnRemove = document.createElement("button");

                    //variable de parse name sacados de users

                    tdName.innerHTML = x.name;
                    tdAge.innerHTML = x.age;

                    //estilos de boton y evento de borrar

                    btnRemove.textContent = 'Remove';
                    btnRemove.className = 'btn btn-xs btn-danger';

                    btnRemove.addEventListener('click', function(){
                        //llamar funcion para borrar dato de localstore
                        removeFromLocalStorage(i);
                    });

                    // Agregar boton de remove

                    tdRemove.appendChild(btnRemove);

                    //Agregar info

                    tr.appendChild(tdName);
                    tr.appendChild(tdAge);
                    tr.appendChild(tdRemove);

                    //Agregar info en grid o fila

                    gridBody.appendChild(tr);
                });
            }

            function removeFromLocalStorage(index){

                // variable o arreglo users

                var users = [],

                dataInLocalStorage = localStorage.getItem(localStorageKeyName);

                users = JSON.parse(dataInLocalStorage);

                //borrar 1 dato array

                users.splice(index, 1);

                //Actualizar localStorage

                localStorage.setItem(localStorageKeyName, JSON.stringify(users));

                loadFromLocalStorage();
            }
        }