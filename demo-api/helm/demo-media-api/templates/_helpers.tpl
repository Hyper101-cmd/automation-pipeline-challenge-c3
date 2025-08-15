{{- define "demo-media-api.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}
{{- define "demo-media-api.fullname" -}}
{{- if .Values.fullnameOverride -}}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- include "demo-media-api.name" . -}}
{{- end -}}
{{- end -}}
{{- define "demo-media-api.chart" -}}
{{ .Chart.Name }}-{{ .Chart.Version }}
{{- end -}}
