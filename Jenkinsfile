pipeline {
    agent none
  
    stages {
      
        stage("Fix the permission issue") {
            agent any

            steps {
              sh "sudo chown root:jenkins /run/docker.sock"
            }
        }
      
        stage('build') {
            agent { docker { image 'node:14-alpine' } }
            steps {
                sh 'npm --version'
            }
        }
    }
}
