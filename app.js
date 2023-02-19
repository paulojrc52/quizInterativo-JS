const form = document.querySelector('.quiz-form')
const finalScoreContainer = document.querySelector('.final-score-container')

const correctAnswers = ['D', 'C', 'B', 'A']

let score = 0

const getUserAnswers = () => {
  let userAnswers = []

  correctAnswers.forEach((_, index)=> {
    const userAnswer = form[`inputQuestion${index + 1}`].value
    userAnswers.push(userAnswer)

  })

  return userAnswers
}

const calculateUserScore = userAnswers => {
  userAnswers.forEach((userAnswer, index) => {
    const isUserAnswerCorrect = userAnswer === correctAnswers[index]
    if(isUserAnswerCorrect) {
      if(score < 100) {
        score += 25
      }
    }
  })
} 

const showFinalScore = () => {
  scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  })
  finalScoreContainer.classList.remove('d-none')
  setTimeout(() => {
    location.reload()
  }, 7000)
}

const animateFinalScore = () => {
  let counter = 0
  
  const timer = setInterval(() => {
    if(counter === score || counter > score) {
      clearInterval(timer)
      return
    }
    counter++

    finalScoreContainer.querySelector('span').textContent = `${counter}%`
  }, 10)
}

const handleSubmitForm = event => {
  event.preventDefault()

  const userAnswers = getUserAnswers()

  calculateUserScore(userAnswers)
  showFinalScore()
  animateFinalScore()
}

form.addEventListener('submit', handleSubmitForm)
