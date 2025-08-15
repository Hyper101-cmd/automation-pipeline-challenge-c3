# **Automation Pipeline Challenge C3**

[![Ansible](https://img.shields.io/badge/Ansible-2.14+-blue)](https://www.ansible.com/)  
[![Python](https://img.shields.io/badge/Python-3.11+-blue)](https://www.python.org/)  
[![GitLab CI](https://img.shields.io/badge/GitLab-CI/CD-orange)](https://about.gitlab.com/stages-devops-lifecycle/continuous-integration/)

## **Overview**
This repository contains the solution for the **Automation Pipeline Challenge C3**, demonstrating automation using **Ansible**, CI/CD pipeline setup, and infrastructure configuration management. The project showcases modular and scalable automation practices for deploying and managing servers, applications, and monitoring agents.

## **Extended Description**
The **Automation Pipeline Challenge C3** demonstrates an end-to-end automation solution for managing infrastructure and applications using **Ansible**. This project simulates a real-world enterprise environment where servers, services, and monitoring agents must be deployed consistently and efficiently across multiple hosts.  

Key highlights of this project:  
- **Infrastructure as Code (IaC):** Using Ansible roles and playbooks to standardize deployment and configuration.  
- **Modular Architecture:** Roles for NGINX, Zabbix agent, and maintenance tasks allow reusability and easier maintenance.  

## **CI/CD Pipeline (GitLab)**
Automates testing, build, deployment, and rollback for the API on Kubernetes.

**Goals**

Enforce quality (YAML & Ansible lint, syntax check)

Build API container and push to GitLab Container Registry

Deploy to Kubernetes (Dev → Staging → Prod) using Helm or kubectl

Run smoke tests after each deploy

Enable one-click rollback via Helm

**Stages**

validate – Run yamllint, ansible-lint, Ansible syntax check, and render templates locally

build – Build and push API image (tags: latest + commit SHA)

deploy – Helm upgrade/install to target namespace with new image tag

smoke – Test /healthz endpoint in Kubernetes service

promote – Manual approvals for staging → prod promotion

rollback – Manual helm rollback to previous release

**Secrets & Config**

Store secrets as masked GitLab CI/CD variables:
KUBE_CONFIG, HELM_REPO_AUTH, ANSIBLE_VAULT_PASSWORD

Use Kubernetes Secrets or GitLab Vault for sensitive values

Environment configs:

Separate Helm values files (values-dev.yaml, values-staging.yaml, values-prod.yaml)

Or use GitLab environment variables

**Rollback Strategy**

Helm: helm rollback to a previous release

Image pinning: redeploy last-known-good image tag

This pipeline covers automated validation, Kubernetes deployments with gated promotions, and rapid rollback, aligned to a modern containerized infrastructure.

## Automation Pipeline Diagram
<a href="docs/automation-pipeline.png">
  <img src="docs/automation-pipeline.png" alt="Automation Pipeline" width="450">
</a>

## Features
- Automated server and application setup using **Ansible** roles and playbooks.  
- Configuration management for **NGINX**, **Zabbix agent**, and **maintenance tasks**.  
- CI/CD pipeline integration with **GitLab CI/CD**.  
- Modular inventory and variable management for multiple environments.  
- Documentation of setup and outputs in `docs/submission.pdf`.

## Repository Structure
```text
automation-pipeline-challenge-c3/
├── ansible/
│   ├── inventories/
│   │   └── hosts.ini
│   ├── group_vars/
│   │   └── all.yml
│   ├── roles/
│   │   ├── nginx/
│   │   │   ├── tasks/main.yml
│   │   │   └── templates/
│   │   │       ├── nginx.conf.j2
│   │   │       └── site.conf.j2
│   │   ├── zabbix_agent/
│   │   │   ├── tasks/main.yml
│   │   │   └── templates/zabbix_agentd.conf.j2
│   │   └── maintenance/
│   │       └── tasks/main.yml
│   ├── playbooks/
│   │   ├── site.yml
│   │   ├── maintenance.yml
│   │   └── certs_create.yml
│   └── ansible.cfg
├── .gitlab-ci.yml
├── README.md
└── docs/
    └── submission.pdf
```
## **How the Roles Work**

| Role             | Purpose                               |                       Key Tasks                                           |
|------------------|---------------------------------------|---------------------------------------------------------------------------|
| **nginx**        | Configure and deploy NGINX web server | Install NGINX, deploy `nginx.conf` & `site.conf` templates, start service |
| **zabbix_agent** | Deploy monitoring agent               | Install Zabbix agent, configure `zabbix_agentd.conf`, start service |
| **maintenance**  | Perform maintenance tasks             | Clean up logs, rotate files, run custom scripts |

## **Prerequisites**
- **Ansible** >= 2.14  
- **Python** >= 3.11  
- Git installed locally  
- SSH access to target hosts

## **Setup & Usage**

Clone the repository:

git clone https://github.com/joycemwangi/automation-pipeline-challenge-c3.git
cd automation-pipeline-challenge-c3


Run the main playbook (site.yml) to provision and configure servers:

ansible-playbook -i ansible/inventories/hosts.ini ansible/playbooks/site.yml


Run maintenance tasks (optional):

ansible-playbook -i ansible/inventories/hosts.ini ansible/playbooks/maintenance.yml

Generate or manage certificates:

ansible-playbook -i ansible/inventories/hosts.ini ansible/playbooks/certs_create.yml

## **CI/CD Integration**

.gitlab-ci.yml defines the pipeline for automated testing and deployment of playbooks.

Pipeline stages include syntax checking, role linting, and deployment validation.

## **Contributing**

Contributions are welcome. To contribute:

1. Fork the repository.

2. Create a feature branch:

git checkout -b feature/your-feature

3. Commit changes:

git commit -m 'Add feature'

4. Push to the branch:

git push origin feature/your-feature

5. Open a pull request.

## **Local Validation (No Servers Required)**

This repo includes a localhost inventory and a render-only playbook so you can validate roles and templates without access to the challenge infrastructure.

## **What it does:**

Renders NGINX (LB + web) and Zabbix Agent configs to ansible/temp/

Doesn’t touch your system services

Proves variables and Jinja2 templates compile cleanly

## **Run it:**

#From the repo root
ansible-playbook -i ansible/inventories/localhost.ini ansible/playbooks/render_templates.yml
ls -l ansible/temp/
#Expect: site-lb.conf, site-web.conf, zabbix_agentd.conf


## **Files Involved:**
ansible/inventories/localhost.ini — localhost-only inventory

ansible/playbooks/render_templates.yml — renders templates to ansible/temp/

ansible/temp/ — output workspace (ignored by Git except for .gitkeep)

ansible/temp/ is intentionally in .gitignore so generated files don’t get committed.

## **License**

This project is licensed under the MIT License.


---

