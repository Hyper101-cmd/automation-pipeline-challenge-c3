# demo-media-api Helm Chart

## Install
```bash
helm upgrade --install demo-api ./demo-api/helm/demo-media-api \
  --namespace demo --create-namespace \
  --set image.repository=REPLACE/IMAGE \
  --set image.tag=REPLACE_TAG
