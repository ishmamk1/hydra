terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 2.20"
    }
  }
}

provider "docker" {}

resource "docker_image" "dynamodb_local" {
  name = "amazon/dynamodb-local"
}

resource "docker_container" "dynamodb_local" {
  image = docker_image.dynamodb_local.name
  name  = "dynamodb_local"
  ports {
    internal = 8000
    external = 8000
  }
}

resource "null_resource" "create_table" {
  depends_on = [docker_container.dynamodb_local]

  provisioner "local-exec" {
    command = <<EOT
        aws dynamodb create-table \
        --table-name ${var.pull_request_table_name} \
        --attribute-definitions AttributeName=id,AttributeType=S \
        --key-schema AttributeName=id,KeyType=HASH \
        --billing-mode PAY_PER_REQUEST \
        --endpoint-url http://localhost:8000 || true
    EOT
  }
}
