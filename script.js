/*
  Catálogo manual de módulos.
  Para agregar nuevos módulos, se añadirá aquí su nombre y ruta.
*/

const MODULES_FOLDER = "./Modulos/";

let MODULES = [
    {
        id: "ROUTE-VALUATION",
        name: "ROUTE-VALUATION",
        desc: "Valorización de rutas y desplazamientos",
        status: "Disponible",
        folderPath: MODULES_FOLDER + "ROUTE-VALUATION",
        logo: MODULES_FOLDER + "ROUTE-VALUATION/images/logo.png"
    },
    {
        id: "DV_GEO-SOLUTION",
        name: "GEO-SOLUTION",
        desc: "Georreferenciación y validación de PDV",
        status: "Disponible",
        folderPath: MODULES_FOLDER + "GEO-SOLUTION",
        logo: MODULES_FOLDER + "GEO-SOLUTION/images/logo.png"
    },
    {
        id: "DV_ROUTES",
        name: "ROUTES",
        desc: "Clusterización y enrutamiento de visitas",
        status: "En desarrollo",
        icon: "🗺️"
    },
    {
        id: "DAVA_INVENTARIO",
        name: "DAVA INVENTARIO",
        desc: "Control de inventario y existencias",
        status: "En desarrollo",
        icon: "📦"
    },
    {
        id: "DAVA_TALENTO_HUMANO",
        name: "DAVA TALENTO HUMANO",
        desc: "Reclutamiento y selección de personal",
        status: "En desarrollo",
        icon: "🧑‍💼"
    },
    {
        id: "DAVA_ALQUILER_EQUIPOS",
        name: "DAVA ALQUILER DE EQUIPOS",
        desc: "Administración de alquiler de equipos tecnológicos",
        status: "En desarrollo",
        icon: "🖥️"
    },
    {
        id: "DAVA_RESTAURANTES",
        name: "DAVA RESTAURANTES",
        desc: "Pedidos desde tabletas y gestión de mesas",
        status: "En desarrollo",
        icon: "🍽️"
    },
    {
        id: "DAVA_NOMINA_PERSONAL",
        name: "DAVA NÓMINA Y PERSONAL",
        desc: "Administración de personal y nómina",
        status: "En desarrollo",
        icon: "💵"
    }
];

const grid = document.getElementById("moduleGrid");


function loadModules() {
    renderModules(document.getElementById("globalSearch").value);

    if (!MODULES.length) {
        grid.innerHTML = `
            <p style="grid-column:1/-1;color:#64749a;padding:12px">
                No hay módulos configurados.
            </p>
        `;
    }
}


function renderModules(filter = "") {
    grid.innerHTML = "";

    MODULES
        .filter(m =>
            (m.name + " " + m.desc)
                .toLowerCase()
                .includes(filter.toLowerCase())
        )
        .forEach(m => {

            const card = document.createElement("button");

            card.className = "module";
            card.type = "button";

            card.innerHTML = `
                <span class="module-icon"></span>
                <strong></strong>
                <small></small>
                <span class="module-foot">
                    <span>
                        <i class="dot"></i>
                        <span class="module-status"></span>
                    </span>
                    <span class="arrow">→</span>
                </span>
            `;

            const iconBox = card.querySelector(".module-icon");

            iconBox.textContent = m.icon || "🧩";

            if (m.logo) {
                const img = document.createElement("img");

                img.src = m.logo;
                img.alt = "Logo " + m.name;

                img.onerror = () => {
                    img.remove();
                    iconBox.textContent = m.icon || "🧩";
                };

                iconBox.textContent = "";
                iconBox.appendChild(img);
            }

            card.querySelector("strong").textContent = m.name;
            card.querySelector("small").textContent = m.desc;
            card.querySelector(".module-status").textContent = m.status;

            if (m.folderPath) {
                card.addEventListener("click", () => openModule(m));
            } else {
                card.disabled = true;
                card.style.cursor = "default";
                card.style.opacity = ".72";
                card.querySelector(".arrow").textContent = "·";
            }

            grid.appendChild(card);
        });
}


/* =========================================
   PANTALLA COMPLETA DEL MÓDULO
========================================= */

function toggleModuleFullscreen() {

    const workspace = document.getElementById("workspace");
    const button = document.getElementById("fullscreenToggle");

    const isFullscreen = workspace.classList.toggle("fullscreen");

    button.textContent = isFullscreen
        ? "⤢ Salir de pantalla completa"
        : "⛶ Ver en pantalla completa";
}


function exitModuleFullscreen() {

    const workspace = document.getElementById("workspace");
    const button = document.getElementById("fullscreenToggle");

    workspace.classList.remove("fullscreen");

    button.textContent = "⛶ Ver en pantalla completa";
}


/* Salir de pantalla completa con ESC */

document.addEventListener("keydown", e => {

    if (
        e.key === "Escape" &&
        document.getElementById("workspace").classList.contains("fullscreen")
    ) {
        exitModuleFullscreen();
    }

});


/* =========================================
   APERTURA DE MÓDULOS
========================================= */

function openModule(module) {

    document.getElementById("dashboard").classList.add("hidden");

    document.getElementById("workspace").classList.add("active");

    document.getElementById("workspaceTitle").textContent = module.name;

    document.getElementById("workspacePath").textContent = module.desc || "";

    // Ejecuta el index.html de la carpeta del módulo dentro del iframe.

    document.getElementById("moduleFrame").src =
        module.folderPath
            ? module.folderPath + "/index.html"
            : module.url;

    // Siempre abrir inicialmente en modo normal.

    exitModuleFullscreen();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function openUtility(title, url) {

    openModule({
        name: title,
        desc: "Sección de la plataforma",
        url: url
    });

}


/* =========================================
   REGRESAR AL INICIO
========================================= */

function backHome() {

    exitModuleFullscreen();

    document.getElementById("moduleFrame").src = "about:blank";

    document.getElementById("workspace").classList.remove("active");

    document.getElementById("dashboard").classList.remove("hidden");

}


/* =========================================
   NAVEGACIÓN
========================================= */

function showModules() {

    document.getElementById("globalSearch").focus();

    document.getElementById("moduleSection").scrollIntoView({
        behavior: "smooth"
    });

}


document.getElementById("globalSearch")
    .addEventListener("input", e => {
        renderModules(e.target.value);
    });


document.querySelectorAll("nav button").forEach(btn => {

    btn.addEventListener("click", () => {

        document.querySelectorAll("nav button")
            .forEach(b => b.classList.remove("active"));

        btn.classList.add("active");

        const view = btn.dataset.view;

        if (view === "home" || view === "modules") {

            backHome();

            if (view === "modules") {
                showModules();
            }

            return;
        }

        const names = {
            clients: "Clientes",
            equipment: "Equipos",
            support: "Soporte",
            reports: "Reportes",
            settings: "Configuración"
        };

        openUtility(
            names[view],
            "./pages/" + view + ".html"
        );

    });

});


/* =========================================
   INICIALIZACIÓN
========================================= */

loadModules();