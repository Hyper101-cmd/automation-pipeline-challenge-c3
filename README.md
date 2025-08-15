# **Automation Pipeline Challenge C3**

[![Ansible](https://img.shields.io/badge/Ansible-2.14+-blue)](https://www.ansible.com/)  
[![Python](https://img.shields.io/badge/Python-3.11+-blue)](https://www.python.org/)  
[![GitLab CI](https://img.shields.io/badge/GitLab-CI/CD-orange)](https://about.gitlab.com/stages-devops-lifecycle/continuous-integration/)

## **Overview**
This repository contains the solution for the **Automation Pipeline Challenge C3**, which involves designing and partially implementing an infrastructure solution for a scalable, secure, and observable client-facing media search and download API service.  
The API queries Elasticsearch for metadata, retrieves media files from storage, and serves them over HTTPS.  
The core services run on Linux, and the solution reflects a transition toward a modern, containerized environment with automation, reliability, and operational excellence as priorities.

The deployment target includes:
- **Load balancer:** 192.168.10.2
- **Server A:** 192.168.10.3
- **Server B:** 192.168.10.4
- **Zabbix Agent Server:** 192.168.10.5

The challenge tasks included:
1. Provisioning and configuring infrastructure using **Ansible**.
2. Setting up **Nginx** with HTTPS and SSL certificates.
3. Installing and configuring the **Zabbix monitoring agent** for observability.
4. Automating maintenance tasks such as OS patching and reboot.
5. Outlining a **GitLab CI/CD pipeline** for automated testing, build, deployment, and rollback of API updates.

---

## **Extended Description**
This project demonstrates an end-to-end automation workflow for deploying and managing Linux-based infrastructure and application services.  
The automation is designed to be modular, reusable, and environment-agnostic, supporting multiple deployment targets with minimal code changes.

Key highlights:
- **Infrastructure as Code**: Ansible playbooks and roles to provision a load balancer and two application servers.
- **Configuration Management**: Role-based management of Nginx, Zabbix Agent, and maintenance operations.
- **Security & Observability**: HTTPS configuration, SSL certificate handling, and integration with Zabbix monitoring.
- **Maintenance Automation**: Automated OS patching and reboot workflows for keeping servers secure and up to date.
- **CI/CD Integration**: GitLab pipeline for validation, Kubernetes-based deployment, smoke testing, promotion, and rollback.
- **Environment Flexibility**: Inventory and variable structure to easily adapt the same automation to dev, staging, and prod.

## Automation Pipeline Diagram
<a href="docs/automation-pipeline.png">
  <img src="docs/automation-pipeline.png" alt="Automation Pipeline" width="450">
</a>

## **Features**
- **Infrastructure as Code**: Ansible playbooks and roles to provision and configure a load balancer, application servers, and monitoring agents.
- **Role-Based Configuration Management**: Modular roles for Nginx, Zabbix Agent, and maintenance tasks enable reusability and easier maintenance.
- **Security & HTTPS Support**: Automated SSL certificate creation and integration with Nginx for secure API access.
- **Observability**: Zabbix Agent deployment and configuration for real-time monitoring and system health tracking.
- **Automated Maintenance**: Playbooks to apply the latest OS patches and reboot servers automatically.
- **CI/CD Integration**: GitLab pipeline with validation, Kubernetes deployment, smoke testing, promotion between environments, and rollback.
- **Multi-Environment Support**: Flexible inventory and variable structure for dev, staging, and production without code changes.

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

| Role             | Purpose                               | Key Tasks                                                                 |
|------------------|---------------------------------------|---------------------------------------------------------------------------|
| **nginx**        | Configure and deploy NGINX web server with HTTPS support | Install NGINX, deploy `nginx.conf` & `site.conf` templates, configure SSL certificates, start and enable service |
| **zabbix_agent** | Deploy monitoring agent for observability | Install Zabbix agent, configure `zabbix_agentd.conf`, enable active checks, start and enable service |
| **maintenance**  | Automate system maintenance tasks     | Apply latest OS patches, reboot if required, clean up logs, rotate files |


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

