pipeline {
    agent { docker { image 'node:14-alpine' } }
  
    stage("Fix the permission issue") {

        agent any

        steps {
            sh "sudo chown root:jenkins /run/docker.sock"
        }

    }
  
    stages {
        stage('build') {
            steps {
                sh 'npm --version'
            }
        }
    }
}
