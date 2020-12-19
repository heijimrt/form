node {
    stage('Install') {
      sh 'npm install'
    }

    stage('Test') {
      parallel {
        stage('Static code analysis') {
            sh 'npm run-script lint'
        }
        stage('Unit tests') {
            sh 'npm run-script test'
        }
      }
    }

    stage('Build') {
      sh 'npm run-script build'
    }
}
