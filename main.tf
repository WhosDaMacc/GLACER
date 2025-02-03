terraform {
  backend "remote" {
    # The name of your Terraform Cloud organization.
    organization = "GLACERWORLD"

    # The name of the Terraform Cloud workspace to store Terraform state files in.
    workspaces {
      name = "GlacerIceberg"
    }
  }
}

# An example resource that does nothing.
resource "null_resource" "example" {
  triggers = {
    value = "An example resource that does nothing!"
  }
}
terraform { 
  cloud { 
    
    organization = "GLACERWORLD" 

    workspaces { 
      name = "GlacerIceberg" 
    } 
  } 
}
terraform { 
  cloud { 
    
    organization = "GLACERWORLD" 

    workspaces { 
      name = "GlacerIceberg" 
    } 
  } 
}