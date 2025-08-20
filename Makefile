.PHONY: lint
lint:
	ANSIBLE_CONFIG=ansible/ansible.cfg ANSIBLE_COLLECTIONS_PATH=ansible/collections ansible-lint ansible/playbooks/site.yml
	yamllint -c .yamllint ansible/
