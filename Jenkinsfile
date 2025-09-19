pipeline { 
    agent any
    environment{
        OPENSHIFT_PROJECT = 'omni365'
    }
    stages {
        stage('Install dependencies') {
            steps {
                echo "Installer les dépendances"
                sh 'npm install'
                sh 'npm remove puppeteer --save-dev'
            }
        }
        stage('Build') {
            steps {
                echo "Build de l'application"
                sh 'npm run build'
            }
        }
        stage('Login to OpenShift') {
            steps {
                withCredentials([string(credentialsId: 'openshift_token', variable: 'TOKEN')]) {
                sh "oc login --token=$TOKEN --server=https://api.ocp.heritage.africa:6443 "
                }
            }
                    
        }
        stage('Deploy to openshift') {
            steps {
                sh 'oc project $OPENSHIFT_PROJECT'
                // sh 'oc delete all,imagestream,buildconfig -l app=omni-app'
                sh 'oc new-app openshift/nodejs:22-ubi8~https://github.com/Bameth/omni365-showcase.git --name=omni-app'
            }
        }
    }
}
