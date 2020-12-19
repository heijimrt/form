pipeline{
  agent { label 'nodejs8' }
  stages{
    stage ('checkout'){
      steps{
        checkout scm
      }
    }
    stage ('install modules'){
      steps{
        sh '''
          npm install --verbose -d 
          npm install --save classlist.js
        '''
      }
    }
    stage ('build') {
      steps{
        sh '$(npm bin)/ng build --prod --build-optimizer'
      }
    }
  }
}
