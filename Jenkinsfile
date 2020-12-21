pipeline {
    agent { docker { image 'node:14-alpine' } }
  
    stages {
      
        stage("Fix the permission issue") {
            agent any

            steps {
              sh "sudo chown root:jenkins /run/docker.sock"
            }
        }
      
        stage('build') {
            steps {
                sh 'npm --version'
            }
        }
    }
}
