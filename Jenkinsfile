pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        echo 'Checkout master branch'
        checkout scm
        dir('webapp') {
          bat 'npm install'
        }
      }
    }
  }
}
