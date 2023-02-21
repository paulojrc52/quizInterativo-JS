const form = document.querySelector('.quiz-form')
const finalScoreContainer = document.querySelector('.final-score-container')

const correctAnswers = ['D', 'C', 'B', 'A']

let score = 0

const getUserAnswers = () => correctAnswers.map((_,index) => 
  form[`inputQuestion${index + 1}`].value)

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

const resetScoreUser = () => {
  score = 0 
}

const handleSubmitForm = event => {
  event.preventDefault()

  const userAnswers = getUserAnswers()

  resetScoreUser()
  calculateUserScore(userAnswers)
  showFinalScore()
  animateFinalScore()
}

form.addEventListener('submit', handleSubmitForm)
