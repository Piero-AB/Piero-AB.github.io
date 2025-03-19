/* ---------------------------------- */
/* MENSAJE WHATSAPP */
/* ---------------------------------- */

const linkWspBase = "https://web.whatsapp.com/send?phone=+51934219344&text="
const linkWspContent = "¡Hola YEI, deseo sumarme al desafío y aportar a democratizar la innovación en la educación! \n Quiero más información 🙌🏼"

document.getElementById('wsp').href = `${linkWspBase}${encodeURIComponent(linkWspContent)}`

/* --------------------------- */
/* IMPACTO ACTUAL - CONTADORES */
/* --------------------------- */
{
    const idDelObjectoAObservar = "impacto-actual";

    let observer = undefined;

    const generarActualizador = (idElemento, numeroObjetivo) => {
        if (!idElemento || !numeroObjetivo) return;
        if (typeof numeroObjetivo !== "number") return;

        const elemento = document.getElementById(idElemento);

        if (!(elemento instanceof HTMLElement)) return;
        if (!elemento.textContent) return;

        let numeroActual = 0;
        const duracion = 1000;
        const tiempoDeAnimacion = 10;

        const incremento = numeroObjetivo / (duracion / tiempoDeAnimacion);

        return function actualizarContador() {
            numeroActual += incremento;
            if (numeroActual >= numeroObjetivo) {
                elemento.textContent = numeroObjetivo;
            } else {
                elemento.textContent = Math.round(numeroActual);
                requestAnimationFrame(actualizarContador);
            }
        }
    }


    



    const animacionDeContadores = (entries, _observer) => {
        entries.forEach(entry => {
            if (entry.target.id !== idDelObjectoAObservar || !entry.isIntersecting) return;

            generarActualizador("impacto-actual-horas-de-inmersion", 60)?.();
            generarActualizador("impacto-actual-ninos-y-ninas", 210)?.();
            generarActualizador("impacto-actual-familias", 210)?.();
            generarActualizador("impacto-actual-docentes-impactados", 12)?.();

            observer?.disconnect();
        });
    };

    observer = new IntersectionObserver(animacionDeContadores, {
        root: null,
        rootMargin: '0px',
        threshold: 0.50,
    });

    const sectionImpactoActual = document.getElementById(idDelObjectoAObservar);
    observer.observe(sectionImpactoActual);
}

/* ---------------------------- */
/* SUMATE AL DESAFIO - CARRUSEL */
/* ---------------------------- */
{
    const idDelObjectoAObservar = "sumate-al-desafio-carrusel";
    let observer = undefined;

    const animacionDeCarrusel = (entries, _observer) => {
        entries.forEach(entry => {
            if (entry.target.id !== idDelObjectoAObservar || !entry.isIntersecting) return;

            const elementoCarrusel = document.getElementById(idDelObjectoAObservar);
            if (!elementoCarrusel) return;

            let primerElemento = document.getElementById("sumate-al-desafio-1");
            let segundoElemento = document.getElementById("sumate-al-desafio-2");

            if (!primerElemento || !segundoElemento) return;

            /* ACTIVAR ANIMACION INMEDIATAMENTE */
            carrusel.style.transform = "translateX(-100%)";
            let elementoActivo = segundoElemento;

            setInterval(() => {
                if (elementoActivo === primerElemento) {
                    carrusel.style.transform = "translateX(-100%)";
                    elementoActivo = segundoElemento;
                } else {
                    carrusel.style.transform = "translateX(0%)";
                    elementoActivo = primerElemento;
                }
            }, 6000);

            observer?.disconnect();
        });
    };

    const carrusel = document.getElementById(idDelObjectoAObservar);

    observer = new IntersectionObserver(animacionDeCarrusel, {
        root: null,
        rootMargin: '0px',
        threshold: 0.80,
    });

    observer.observe(carrusel)
}

/* ------------------- */
/* META - VALIDACIONES */
/* ------------------- */

const debounce = (func, timeout = 300) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
};

const limpiarValidacion = (idElemento) => {
    const elemento = document.getElementById(idElemento);
    if (!elemento || !(elemento instanceof HTMLElement)) return;

    elemento.setCustomValidity("");
    elemento.reportValidity();
};

// NOMBRE
const validarNombre = () => {
    const elemento = document.getElementById("nombre");
    if (!elemento || !(elemento instanceof HTMLElement)) return;

    const valor = elemento.value;
    let errores = ""

    if (valor.length > 25) errores += "El nombre no debe tener más de 25 caracteres";

    elemento.setCustomValidity(errores);
    elemento.reportValidity();
};

const debouncedValidarNombre = debounce(validarNombre);

const validarNombreAlIngresarTexto = () => {
    limpiarValidacion("nombre");
    debouncedValidarNombre();
};

// APELLIDO
const validarApellido = () => {
    const elemento = document.getElementById("apellido");
    if (!elemento || !(elemento instanceof HTMLElement)) return;

    const valor = elemento.value;
    let errores = ""

    if (valor.length > 25) errores += "El apellido no debe tener más de 25 caracteres";

    elemento.setCustomValidity(errores);
    elemento.reportValidity();
};

const debouncedValidarApellido = debounce(validarApellido);

const validarApellidoAlIngresarTexto = () => {
    limpiarValidacion("apellido");
    debouncedValidarApellido();
};

// CORREO
const validarCorreo = () => {
    const elemento = document.getElementById("correo");
    if (!elemento || !(elemento instanceof HTMLElement)) return;

    const valor = elemento.value;
    let errores = ""

    if (valor.length > 25) errores += "El correo no debe tener más de 25 caracteres";
    if (!valor.includes('@')) errores += "\nEl correo debe contener un @";
    if (!valor.includes('.')) errores += "\nEl correo debe contener un .";

    elemento.setCustomValidity(errores);
    elemento.reportValidity();
};

const debouncedValidarCorreo = debounce(validarCorreo);

const validarCorreoAlIngresarTexto = () => {
    limpiarValidacion("correo");
    debouncedValidarCorreo();
};

/* VALIDACIONES - INPUTS DINÁMICOS AÑADIDOS VIA JAVASCRIPT */

// RUC
const validarRuc = () => {
    const elemento = document.getElementById("ruc");
    if (!elemento || !(elemento instanceof HTMLElement)) return;

    const valor = elemento.value;
    let errores = ""

    if (valor[0] + valor[1] !== "10" && valor[0] + valor[1] !== "20") errores += "El RUC debe empezar con los dígitos 10 o 20";
    if (valor.length !== 11) errores += "\nEl RUC debe tener exactamente 11 dígitos";

    elemento.setCustomValidity(errores);
    elemento.reportValidity();
}

const debouncedValidarRuc = debounce(validarRuc);

const validarRucAlIngresarTexto = () => {
    limpiarValidacion("ruc");
    debouncedValidarRuc();
};

// RAZON SOCIAL
const validarRazonSocial = () => {
    const elemento = document.getElementById("razon-social");
    if (!elemento || !(elemento instanceof HTMLElement)) return;

    const valor = elemento.value;
    let errores = ""

    if (valor.length < 3) errores += "La razón social debe tener más de 3 caracteres";
    if (30 < valor.length) errores += "\nLa razón social debe tener menos de 30 caracteres";

    elemento.setCustomValidity(errores);
    elemento.reportValidity();
}

const debouncedValidarRazonSocial = debounce(validarRazonSocial);

const validarRazonSocialAlIngresarTexto = () => {
    limpiarValidacion("razon-social");
    debouncedValidarRazonSocial();
};

/* FIN VALIDACIONES - INPUTS DINÁMICOS AÑADIDOS VIA JAVASCRIPT */

// CELULAR
const validarCelular = () => {
    const elemento = document.getElementById("celular");
    if (!elemento || !(elemento instanceof HTMLElement)) return;

    const valor = elemento.value;
    let errores = ""

    if (valor[0] !== '9') errores += "El celular debe empezar con el dígito 9";
    if (valor.length !== 9) errores += "\nEl celular debe tener exactamente 9 dígitos";


    elemento.setCustomValidity(errores);
    elemento.reportValidity();
};

const debouncedValidarCelular = debounce(validarCelular);

const validarCelularAlIngresarTexto = () => {
    limpiarValidacion("celular");
    debouncedValidarCelular();
};

/* ---------------------------------- */
/* META - FORMULARIO INPUTS DINÁMICOS */
/* ---------------------------------- */
let perteneceAEmpresa = false;
let removerInputsDinamicos = undefined;
const manejarCambioDePerteneceAEmpresa = () => {
    const formulario = {
        id: "meta-formulario",
        claseSiPertenezco: "si-pertenezco-a-una-empresa",
        perteneceAEmpresa: {
            id: "pertenezce_a_una_empresa",
            textoSiPertezco: "si_pertenezco_a_una_empresa",
        },
        correo: {
            id: "correo",
        }
    }

    const formMetaFormulario = document.getElementById(formulario.id);

    const selectPerteneceAEmpresa = document.getElementById(formulario.perteneceAEmpresa.id);
    if (!selectPerteneceAEmpresa) return;

    const valorSeleccionado = selectPerteneceAEmpresa.value;

    const nuevosInputs = {
        ruc: {
            tag: "input",
            type: "number",
            id: "ruc",
            placeholder: "RUC",
            oninput: validarRucAlIngresarTexto,
        },
        razonSocial: {
            tag: "input",
            type: "text",
            id: "razon-social",
            placeholder: "Razón social",
            maxLength: 30,
            oninput: validarRazonSocialAlIngresarTexto,
        }
    }

    const removeInputs = () => {
        if (!perteneceAEmpresa) return;

        const seHanAnadidoInputs = formMetaFormulario.classList.contains(formulario.claseSiPertenezco);
        if (!seHanAnadidoInputs) return;

        formMetaFormulario.classList.remove(formulario.claseSiPertenezco);

        const inputRuc = formMetaFormulario.querySelector(`#${nuevosInputs.ruc.id}`);
        const inputRazonSocial = formMetaFormulario.querySelector(`#${nuevosInputs.razonSocial.id}`);

        perteneceAEmpresa = false;
        inputRuc?.remove();
        inputRazonSocial?.remove();
    }
    removerInputsDinamicos = removeInputs;

    if (valorSeleccionado === formulario.perteneceAEmpresa.textoSiPertezco) {

        if (perteneceAEmpresa) return;

        const inputCorreo = document.getElementById(formulario.correo.id);

        const inputRuc = document.createElement(nuevosInputs.ruc.tag);
        inputRuc.type = nuevosInputs.ruc.type;
        inputRuc.id = nuevosInputs.ruc.id;
        inputRuc.placeholder = nuevosInputs.ruc.placeholder;
        inputRuc.oninput = nuevosInputs.ruc.oninput;

        const inputRazonSocial = document.createElement(nuevosInputs.razonSocial.tag);
        inputRazonSocial.type = nuevosInputs.razonSocial.type;
        inputRazonSocial.id = nuevosInputs.razonSocial.id;
        inputRazonSocial.placeholder = nuevosInputs.razonSocial.placeholder;
        inputRazonSocial.maxLength = nuevosInputs.razonSocial.maxLength;
        inputRazonSocial.oninput = nuevosInputs.razonSocial.oninput;

        perteneceAEmpresa = true;
        formMetaFormulario.classList.add(formulario.claseSiPertenezco);
        formMetaFormulario.insertBefore(inputRuc, inputCorreo);
        formMetaFormulario.insertBefore(inputRazonSocial, inputCorreo);

    } else {
        removeInputs()
    }
};

/* ------------------------ */
/* META - FORMULARIO ENVIAR */
/* ------------------------ */
const enviarFormulario = (e) => {
    e.preventDefault();

    const inputNombre = document.getElementById("nombre");
    const inputApellido = document.getElementById("apellido");
    const inputPertenezceAUnaEmpresa = document.getElementById("pertenezce_a_una_empresa");
    const inputCorreo = document.getElementById("correo");
    const inputCelular = document.getElementById("celular");

    const botonEnviar = document.getElementById("boton-enviar");

    /* INPUTS DINÁMICOS AÑADIDOS VIA JAVASCRIPT */
    const inputRuc = document.getElementById("ruc");
    const inputRazonSocial = document.getElementById("razon-social");
    /* FIN - INPUTS DINÁMICOS AÑADIDOS VIA JAVASCRIPT */

    if (!inputNombre || !inputApellido || !inputPertenezceAUnaEmpresa || !inputCorreo || !inputCelular || !botonEnviar) return;

    botonEnviar.disabled = true;
    botonEnviar.style.cursor = "auto"

    fetch("https://formcarry.com/s/Rdfe8INYN-y", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
            nombre: inputNombre.value,
            apellido: inputApellido.value,
            "pertenezce_a_una_empresa": inputPertenezceAUnaEmpresa.value,
            ruc: inputRuc?.value,
            "razon-social": inputRazonSocial?.value,
            correo: inputCorreo.value,
            celular: inputCelular.value,
        })
    })
        .then((res) => {
            if (!res.ok) throw res.status;
            inputNombre.value = "";
            inputApellido.value = "";
            inputPertenezceAUnaEmpresa.value = "";
            inputCorreo.value = "";
            inputCelular.value = "";

            if (inputRuc && inputRazonSocial) {
                removerInputsDinamicos();
            }

            botonEnviar.innerText = "Datos enviados ✔️";
        })
        .catch(error => {
            console.log(error);
            botonEnviar.innerText = "Hubo un error ❌";
            if (inputRuc && inputRazonSocial) {
                removerInputsDinamicos();
            }
        })
        .finally(() => {
            setTimeout(() => {
                let count = 3;
                const interval = setInterval(function () {
                    if (count === 0) {
                        botonEnviar.innerText = "Enviar";
                    } else {
                        botonEnviar.innerText = count;
                    }

                    count--;
                    if (count < 0) {
                        botonEnviar.disabled = false;
                        botonEnviar.style.cursor = "pointer";
                        clearInterval(interval);
                    }
                }, 1000);
            }, 1500);
        })
}