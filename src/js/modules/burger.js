const burger = () => {
  document.querySelector('.menu__burger').addEventListener('click', function() {
    this.classList.toggle('_active')
    document.querySelector('.menu__nav').classList.toggle('_active')
    document.querySelector('body').classList.toggle('_lock')
  })
}

export default burger