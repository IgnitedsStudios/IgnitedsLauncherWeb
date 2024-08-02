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
      backgroundContainer.innerHTML = '';
  
      if (eventData.backgroundIsVideo) {
        const video = document.createElement('video');
        video.id = 'backgroundVideo';
        video.loop = true;
        video.volume = 0.5;
        video.style.position = 'absolute';
        video.style.top = '0';
        video.style.left = '0';
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.objectFit = 'cover';
        video.src = eventData.background;
        backgroundContainer.appendChild(video);
  
        // Intenta reproducir el video después de 2 segundos
        setTimeout(() => {
          video.play().catch(error => {
            console.error("Error playing video:", error);
          });
        }, 2000);
      } else {
        const img = document.createElement('img');
        img.id = 'backgroundImage';
        img.src = eventData.background;
        img.alt = 'Background Image';
        img.style.position = 'absolute';
        img.style.top = '0';
        img.style.left = '0';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
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
          openLink(eventData.packs);
        } else {
          console.error("URL de los packs no disponible.");
        }
      });
  
      reloadButton.addEventListener("click", () => {
        window.location.reload();
      });
    } catch (error) {
      console.error("Error loading event data:", error);
    }
  });
  
  function openMinecraft(serverUrl, serverPort) {
    const url = `minecraft://connect?serverUrl=${serverUrl}&serverPort=${serverPort}`;
    window.open(url, "_self");
  }
  
  function openLink(url) {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const target = isMobile ? "_blank" : "_self";
    console.log(navigator.userAgent)
    window.open(url, target);
  }
  
