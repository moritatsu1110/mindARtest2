

  const showPortfolio = (done) => {
    const portfolio = document.querySelector("#portfolio-panel");
    const portfolioLeftButton = document.querySelector("#portfolio-left-button");
    const portfolioRightButton = document.querySelector("#portfolio-right-button");

    const paintandquestPreviewButton = document.querySelector("#paintandquest-preview-button");
    const paintandquestVideoLink = document.querySelector("#paintandquest-video-link");
  

    let y = 0;
    let currentItem = 0;

    portfolio.setAttribute("visible", true);

    const showPortfolioItem = (item) => {
      for (let i = 0; i <= 2; i++) {
        document.querySelector("#portfolio-item" + i).setAttribute("visible", i === item);
      }
    }
    
    const id = setInterval(() => {
      y += 0.2;
      if (y >= 0.001) {
        clearInterval(id);
        portfolioLeftButton.addEventListener('click', () => {
          currentItem = (currentItem + 1) % 3;
          showPortfolioItem(currentItem);
        });
        portfolioRightButton.addEventListener('click', () => {
          currentItem = (currentItem - 1 + 3) % 3;
          showPortfolioItem(currentItem);
        });
      

        paintandquestPreviewButton.addEventListener('click', () => {
          paintandquestPreviewButton.setAttribute("visible", "false");
          paintandquestVideoLink.setAttribute("visible", "true");
          
          const message2 = document.querySelector("#message1");
        if (message2) {
        message2.setAttribute("visible", "false");
        }
          
      
          const webButton = document.querySelector("#web-button");
          const onemoreButton = document.querySelector("#onemore-button")
          setTimeout(() => {
            webButton.setAttribute("visible", "true");
            onemoreButton.setAttribute("visible", "true");
            onemoreButton.setAttribute("class", "clickable");
            
          }, 13500);

          const testVideo = document.createElement( "video" );
          const canplayWebm = testVideo.canPlayType( 'video/webm; codecs="vp8, vorbis"' );
          if (canplayWebm == "") {
            document.querySelector("#paintandquest-video-link").setAttribute("src", "#paintandquest-video-mp4");
            document.querySelector("#paintandquest-video-mp4").play();
          } else {
            document.querySelector("#paintandquest-video-link").setAttribute("src", "#paintandquest-video-webm");
            document.querySelector("#paintandquest-video-webm").play();
          }
        });

        setTimeout(() => {
          done();
        }, 5);
      }
      portfolio.setAttribute("position", "0 " + y + " -0.01");
    }, 5);
  }
  

  AFRAME.registerComponent('mytarget', {
    init: function () {
      this.el.addEventListener('targetFound', event => {
        console.log("target found");
        showAvatar(() => {
          setTimeout(() => {
            showPortfolio(() => {
              setTimeout(() => {
                showInfo();
              }, 30);
            })
          }, 3);
        });
      });
      this.el.addEventListener('targetLost', event => {
        console.log("target found");
      });
      this.el.emit('targetFound');
    }
  });

  const showAvatar = (onDone) => {
    const avatar = document.querySelector("#avatar");
    let y = -0.3;
    const id = setInterval(() => {
      y += 1;
      if (y >= 5) {
        clearInterval(id);
        onDone();
      }
      avatar.setAttribute("position", "0 -0.25 " + y);
    }, 5);
  }
