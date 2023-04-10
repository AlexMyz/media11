const popups = () => {
  const popupLinks = document.querySelectorAll('.popup-link')
  const body = document.querySelector('body')
  const lockPadding = document.querySelectorAll('.lock-padding')
  const popupCloseIcons = document.querySelectorAll('.close-popup')

  let unlock = true

  const timeout = 800

  const bodyLock = () => {
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px'

    if (lockPadding.length > 0) {
      for (let i = 0; i < lockPadding.length; i++) {
        const el = lockPadding[i];
        el.style.paddingRight = lockPaddingValue
      }
    }
    
    body.style.paddingRight = lockPaddingValue
    body.classList.add('_lock')

    unlock = false
    setTimeout(() => {
      unlock = true
    }, timeout);
  }

  const bodyUnLock = () => {
    setTimeout(() => {
      if (lockPadding.length > 0) {
        for (let i = 0; i < lockPadding.length; i++) {
          const el = lockPadding[i]
          el.style.paddingRight = '0px'
        }
      }
      body.style.paddingRight = '0px'
      if (!document.querySelector('.menu__nav').classList.contains('_active')) {
        body.classList.remove('_lock')
      }
    }, timeout);

    unlock = false
    setTimeout(() => {
      unlock = true
    }, timeout);
  }

  const popupClose = (popupActive, doUnLock = true) => {
    if (unlock) {
      popupActive.classList.remove('_open')
      document.querySelector('.popup-search__form').reset()
      if (doUnLock) {
        bodyUnLock()
      }
    }
  }

  const popupOpen = (curentPopup) => {
    if (curentPopup && unlock) {
      const popupActive = document.querySelector('.popup._open')
      if (popupActive) {
        popupClose(popupActive, false)
      } else {
        bodyLock()
      }
      curentPopup.classList.add('_open')
      curentPopup.addEventListener('click', e => {
        if (!e.target.closest('.popup-search__field')) {
          popupClose(e.target.closest('.popup'))
        }
      })
      document.addEventListener('keydown', e => {
        if (e.keyCode === 27) {
          popupClose(curentPopup)
        }
      })
    }
  }

  if (popupLinks.length > 0) {
    for (let i = 0; i < popupLinks.length; i++) {
      const popupLink = popupLinks[i]
      popupLink.addEventListener('click', e => {
        e.preventDefault()
        const popupName = popupLink.getAttribute('href').replace('#', '')
        const curentPopup = document.getElementById(popupName)
        popupOpen(curentPopup)
      })
    }
  }

  if (popupCloseIcons.length > 0) {
    for (let i = 0; i < popupCloseIcons.length; i++) {
      const el = popupCloseIcons[i];
      el.addEventListener('click', e => {
        e.preventDefault()
        popupClose(el.closest('.popup'))
      })
    }
  }
}

export default popups