![imageground](https://cdn.unburn.tech/unburn/imageground.png)

# ImageGround 🔥 Powerful Image Transformation
**ImageGround**, an open-source project to transform image in realtime using Netlify Image CDN.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/flameface/unburn-image-ground)

## Table of Contents
- [ImageGround 🔥 Powerful Image Transformation](#imageground--powerful-image-transformation)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Community](#community)
  - [Getting Started](#getting-started)
  - [Acknowledgements](#acknowledgements)
  - [License](#license)

## Features
In ImageGround, you have various options to transform image:
1. **Width** - Change the width of the image.
2. **Height** - Change the height of the image.
3. **Quality** - Set the quality of image.
4. **Fit** - Resize the image.
5. **Position** - Position of a cropped image.
6. **Format** - Format of a image (eg. PNG)

You will receive a link to your transformed image, which you can use anywhere or export the image in any format. 

## Community
We have a **[Discord community](https://discord.gg/Edy7rNEY9t)** for developers and creators, a place where you can voice your ideas, explore the products we've made, and have awesome chats.

## Getting Started
A concise guide to launching the application on your local machine is available in this segment.

1. Clone this repository
```
git clone https://github.com/flameface/unburn-image-ground
```

2. Install Dependencies
```
npm install
```

3. Create a `.env.local`, Retrieve your PUBLIC KEY, PRIVATE KEY & ENDPOINT URL from [ImageKit](https://imagekit.io/dashboard/developer/api-keys)
```
IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
IMAGEKIT_URL_ENDPOINT=
```

4. Almost Done, To run the app you require **Netlify CLI**, check out the installation guide [here](https://docs.netlify.com/cli/get-started/), and after installing, run the following command.
```
netlify dev
```

Go to https://localhost:8888, and you will be ready to go!

## Acknowledgements
It's all possible with **[Netlify Image CDN](https://docs.netlify.com/image-cdn/overview/)** 

## License
The **GNU General Public License version 3.0 (GPL-3.0)** is a widely used open-source license that grants users the freedom to use, modify, and distribute software under the condition that any derivative works are also licensed under GPL-3.0 and the source code is made accessible to end-users. It ensures that software remains open and accessible, fostering collaboration and innovation within the open-source community.