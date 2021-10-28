---
title: Resize filesystem
description: 'How to resize the filesystem of a forge ubuntu machine'
position: 11
category: 'DevOps'
---

Prerequisites:
- Ubuntu machine 20GB


Goal:
- To increase the SSD up to 50GB


Steps:
- Go into your aws account, select the EC2 instance, and check the `Storage` tab down bellow: 

<img src="/img-api-ci/aws-ssd.png" width="320" height="320" alt="AWS ec2 Storage"/>

- Click to the `Volume ID` column, and go into the EBS volume

- Choose `Actions -> Modify Volume` action: 

<img src="/img-api-ci/modify-volume.png" width="320" height="320" alt="Modify Volume]"/>

- Input 50 GB and save it.

 Based on [this](https://docs.amazonaws.cn/en_us/AWSEC2/latest/UserGuide/recognize-expanded-volume-linux.html) resource, we will do the next:

- After you ssh into the machine: `lsblk`

- `sudo growpart /dev/nvme0n1 1`

- `sudo resize2fs /dev/root`

- `df -h` - to check the new size




