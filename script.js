document.addEventListener("DOMContentLoaded", async () => {
    try {
      const response = await fetch(
        "https://ignitedsstudios.github.io/IgnitedsLauncher/src/event.json"
      );
      const eventData = await response.json();
  
      const backgroundContainer = document.getElementById("backgroundContainer");
      const title = document.getElementById("title");
      const startButton = document.getElementById("startButton");
      const startImage = document.getElementById("startImage");
      const downloadButton = document.getElementById("downloadButton");
      const reloadButton = document.getElementById("reloadButton");
  
      // Limpia el contenedor de fondo antes de agregar un nuevo fondo
      backgroundContainer.innerHTML = "";
  
      let video;
      if (eventData.backgroundIsVideo) {
        video = document.createElement("video");
        video.id = "backgroundVideo";
        video.loop = true;
        video.volume = 0.5;
        video.style.position = "absolute";
        video.style.top = "0";
        video.style.left = "0";
        video.style.width = "100%";
        video.style.height = "100%";
        video.style.objectFit = "cover";
        video.src = eventData.background;
        backgroundContainer.appendChild(video);
  
        // Intenta reproducir el video después de 2 segundos
        setTimeout(() => {
          video.play().catch((error) => {
            console.error("Error playing video:", error);
          });
        }, 2000);
      } else {
        const img = document.createElement("img");
        img.id = "backgroundImage";
        img.src = eventData.background;
        img.alt = "Background Image";
        img.style.position = "absolute";
        img.style.top = "0";
        img.style.left = "0";
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.objectFit = "cover";
        backgroundContainer.appendChild(img);
      }
  
      title.innerText = eventData.eventName;
  
      startButton.addEventListener("click", () => {
        startImage.src = "assets/startG.gif";
        setTimeout(() => {
          startImage.src = "assets/startP.png";
          openMinecraft(eventData.ip, eventData.port);
        }, 400);
      });
  
      downloadButton.addEventListener("click", () => {
        if (eventData.packs) {
          openDownloadPacks(eventData.packs);
        } else {
          console.error("URL de los packs no disponible.");
        }
      });
  
      reloadButton.addEventListener("click", () => {
        window.location.reload();
      });
  
      // Añade un evento de clic en el documento para pausar o reanudar el video
      document.addEventListener("click", () => {
        if (video) {
          if (video.paused) {
            video.play().catch((error) => {
              console.error("Error playing video:", error);
            });
            backgroundContainer.style.opacity = "1"; // Opacidad normal
          } else {
            video.pause();
            backgroundContainer.style.opacity = "0.5"; // Opacidad reducida
          }
        }
      });
  
      // Añade un evento de teclado para la tecla de espacio para pausar o reanudar el video
      document.addEventListener("keydown", (event) => {
        if (event.code === "Space") {
          event.preventDefault(); // Evita el comportamiento predeterminado de la tecla de espacio
          if (video) {
            if (video.paused) {
              video.play().catch((error) => {
                console.error("Error playing video:", error);
              });
              backgroundContainer.style.opacity = "1"; // Opacidad normal
            } else {
              video.pause();
              backgroundContainer.style.opacity = "2"; // Opacidad reducida
            }
          }
        }
      });
    } catch (error) {
      console.error("Error loading event data:", error);
    }
  });
  
  function openMinecraft(serverUrl, serverPort) {
    const target = isMobile() ? "_blank" : "_self";
    console.log(target);
    const url =
      `minecraft://connect?serverUrl=${serverUrl}&serverPort=${serverPort}`;
    window.open(url, target);
  }
  
  function openDownloadPacks(url) {
    const target = isMobile() ? "_blank" : "_self";
    window.open(url, target);
  }
  
  function isMobile() {
    return /Mobi|Android/i.test(navigator.userAgent);
  }  
