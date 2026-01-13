import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getIconClassName = (iconName: string) => {
  const normalizedIconName = iconName
    .replace(/[^a-zA-Z0-9]/g, "")
    .toLowerCase();

  const techMap: { [key: string]: string } = {
    javascript: "devicon-javascript-plain",
    js: "devicon-javascript-plain",
    typescript: "devicon-typescript-plain",
    ts: "devicon-typescript-plain",
    python: "devicon-python-plain",
    py: "devicon-python-plain",
    java: "devicon-java-plain",
    c: "devicon-c-plain",
    cpp: "devicon-cplusplus-plain",
    cplusplus: "devicon-cplusplus-plain",
    csharp: "devicon-csharp-plain",
    cs: "devicon-csharp-plain",
    go: "devicon-go-original-wordmark",
    golang: "devicon-go-original-wordmark",
    rust: "devicon-rust-plain",
    ruby: "devicon-ruby-plain",
    php: "devicon-php-plain",
    swift: "devicon-swift-plain",
    kotlin: "devicon-kotlin-plain",
    dart: "devicon-dart-plain",
    lua: "devicon-lua-plain",
    perl: "devicon-perl-plain",
    r: "devicon-r-plain",
    scala: "devicon-scala-plain",
    elixir: "devicon-elixir-plain",
    haskell: "devicon-haskell-plain",

    // --- Frontend / UI ---
    html: "devicon-html5-plain",
    html5: "devicon-html5-plain",
    css: "devicon-css3-plain",
    css3: "devicon-css3-plain",
    sass: "devicon-sass-original",
    scss: "devicon-sass-original",
    less: "devicon-less-plain-wordmark",
    react: "devicon-react-original",
    reactjs: "devicon-react-original",
    nextjs: "devicon-nextjs-plain",
    next: "devicon-nextjs-original",
    vue: "devicon-vuejs-plain",
    vuejs: "devicon-vuejs-plain",
    nuxtjs: "devicon-nuxtjs-plain",
    angular: "devicon-angularjs-plain",
    angularjs: "devicon-angularjs-plain",
    svelte: "devicon-svelte-plain",
    jquery: "devicon-jquery-plain",
    bootstrap: "devicon-bootstrap-plain",
    tailwindcss: "devicon-tailwindcss-original",
    tailwind: "devicon-tailwindcss-original",
    materialui: "devicon-materialui-plain",
    mui: "devicon-materialui-plain",
    redux: "devicon-redux-original",
    webpack: "devicon-webpack-plain",
    babel: "devicon-babel-plain",
    vite: "devicon-vitejs-plain",

    // --- Backend / Frameworks ---
    nodejs: "devicon-nodejs-plain",
    node: "devicon-nodejs-plain",
    express: "devicon-express-original",
    expressjs: "devicon-express-original",
    nestjs: "devicon-nestjs-plain",
    django: "devicon-django-plain",
    flask: "devicon-flask-original",
    fastapi: "devicon-fastapi-plain",
    spring: "devicon-spring-plain",
    springboot: "devicon-spring-plain",
    laravel: "devicon-laravel-plain",
    rails: "devicon-rails-plain",
    dotnet: "devicon-dot-net-plain",
    dotnetcore: "devicon-dotnetcore-plain",

    // --- Databases ---
    sql: "devicon-azuresqldatabase-plain", // Generic SQL often uses a specific DB icon or a file icon
    mysql: "devicon-mysql-plain",
    postgresql: "devicon-postgresql-plain",
    postgres: "devicon-postgresql-plain",
    mongodb: "devicon-mongodb-plain",
    mongo: "devicon-mongodb-plain",
    sqlite: "devicon-sqlite-plain",
    redis: "devicon-redis-plain",
    mariadb: "devicon-mariadb-plain",
    oracle: "devicon-oracle-original",
    firebase: "devicon-firebase-plain",
    supabase: "devicon-supabase-plain",
    cassandra: "devicon-cassandra-plain",
    graphql: "devicon-graphql-plain",

    // --- DevOps / Cloud / Tools ---
    git: "devicon-git-plain",
    github: "devicon-github-original",
    gitlab: "devicon-gitlab-plain",
    bitbucket: "devicon-bitbucket-original",
    docker: "devicon-docker-plain",
    kubernetes: "devicon-kubernetes-plain",
    k8s: "devicon-kubernetes-plain",
    aws: "devicon-amazonwebservices-original-wordmark", // or devicon-amazonwebservices-plain-wordmark
    azure: "devicon-azure-plain",
    gcp: "devicon-googlecloud-plain",
    googlecloud: "devicon-googlecloud-plain",
    heroku: "devicon-heroku-original",
    vercel: "devicon-vercel-original", // Needs updated devicon version
    netlify: "devicon-netlify-plain", // Needs updated devicon version
    linux: "devicon-linux-plain",
    ubuntu: "devicon-ubuntu-plain",
    bash: "devicon-bash-plain",
    nginx: "devicon-nginx-original",
    apache: "devicon-apache-plain",
    jenkins: "devicon-jenkins-plain",
    jira: "devicon-jira-plain",
    vscode: "devicon-vscode-plain",
    vim: "devicon-vim-plain",
    figma: "devicon-figma-plain",

    // --- Mobile ---
    android: "devicon-android-plain",
    ios: "devicon-apple-original", // Apple logo for iOS
    flutter: "devicon-flutter-plain",
    reactnative: "devicon-react-original", // Uses React icon
    ionic: "devicon-ionic-original",
  };

  return techMap[normalizedIconName]
    ? `${techMap[normalizedIconName]} colored`
    : "devicon-devicon-plain"; // Default fallback icon
};

export const getTimestamp = (createdAt: Date | string): string => {
  const now = new Date();
  const past = new Date(createdAt);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  const minute = 60;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  // 1. Check for "just now" (less than 5 seconds)
  if (diffInSeconds < 5) {
    return "just now";
  }

  // 2. Handle Seconds
  if (diffInSeconds < minute) {
    return `${diffInSeconds} seconds ago`;
  }

  // 3. Handle Minutes
  if (diffInSeconds < hour) {
    const count = Math.floor(diffInSeconds / minute);
    return `${count} ${count === 1 ? "minute" : "minutes"} ago`;
  }

  // 4. Handle Hours
  if (diffInSeconds < day) {
    const count = Math.floor(diffInSeconds / hour);
    return `${count} ${count === 1 ? "hour" : "hours"} ago`;
  }

  // 5. Handle Days
  if (diffInSeconds < week) {
    const count = Math.floor(diffInSeconds / day);
    return `${count} ${count === 1 ? "day" : "days"} ago`;
  }

  // 6. Handle Weeks
  if (diffInSeconds < month) {
    const count = Math.floor(diffInSeconds / week);
    return `${count} ${count === 1 ? "week" : "weeks"} ago`;
  }

  // 7. Handle Months
  if (diffInSeconds < year) {
    const count = Math.floor(diffInSeconds / month);
    return `${count} ${count === 1 ? "month" : "months"} ago`;
  }

  // 8. Handle Years
  const count = Math.floor(diffInSeconds / year);
  return `${count} ${count === 1 ? "year" : "years"} ago`;
};

export const getTechDescription = (techName: string) => {
  const normalizedTechName = techName
    .replace(/[^a-zA-Z0-9]/g, "")
    .toLowerCase();

  const techDescriptionMap: { [key: string]: string } = {
    javascript:
      "JavaScript is a high-level, interpreted programming language primarily used for creating interactive effects within web browsers.",
    js: "JavaScript is a high-level, interpreted programming language primarily used for creating interactive effects within web browsers.",
    typescript:
      "TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.",
    ts: "TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.",
    python:
      "Python is a high-level, general-purpose programming language known for its readability and versatility.",
    py: "Python is a high-level, general-purpose programming language known for its readability and versatility.",
    java: "Java is a class-based, object-oriented programming language designed to have as few implementation dependencies as possible.",
    c: "C is a general-purpose, procedural computer programming language supporting structured programming.",
    cpp: "C++ is a general-purpose programming language created as an extension of the C programming language.",
    cplusplus:
      "C++ is a general-purpose programming language created as an extension of the C programming language.",
    csharp:
      "C# is a modern, object-oriented, and type-safe programming language developed by Microsoft.",
    cs: "C# is a modern, object-oriented, and type-safe programming language developed by Microsoft.",
    go: "Go is an open source programming language supported by Google that makes it easy to build simple, reliable, and efficient software.",
    golang:
      "Go is an open source programming language supported by Google that makes it easy to build simple, reliable, and efficient software.",
    rust: "Rust is a systems programming language that focuses on safety and performance.",
    ruby: "Ruby is an interpreted, high-level, general-purpose programming language.",
    php: "PHP is a popular general-purpose scripting language that is especially suited to web development.",
    swift:
      "Swift is a powerful and intuitive programming language for iOS, iPadOS, macOS, tvOS, and watchOS.",
    kotlin:
      "Kotlin is a cross-platform, statically typed, general-purpose programming language with type inference.",
    dart: "Dart is a client-optimized language for fast apps on any platform.",
    html: "HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser.",
    html5:
      "HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser.",
    css: "CSS (Cascading Style Sheets) is a style sheet language used for describing the presentation of a document written in a markup language like HTML.",
    css3: "CSS (Cascading Style Sheets) is a style sheet language used for describing the presentation of a document written in a markup language like HTML.",
    react:
      "React is a JavaScript library for building user interfaces, maintained by Meta.",
    reactjs:
      "React is a JavaScript library for building user interfaces, maintained by Meta.",
    nextjs:
      "Next.js is a React framework that enables web applications with server-side rendering and generating static websites.",
    next: "Next.js is a React framework that enables web applications with server-side rendering and generating static websites.",
    vue: "Vue.js is an open-source model–view–viewmodel front end JavaScript framework for building user interfaces and single-page applications.",
    vuejs:
      "Vue.js is an open-source model–view–viewmodel front end JavaScript framework for building user interfaces and single-page applications.",
    angular:
      "Angular is a platform for building mobile and desktop web applications.",
    angularjs:
      "Angular is a platform for building mobile and desktop web applications.",
    svelte: "Svelte is a free and open-source front end component framework.",
    nodejs:
      "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.",
    node: "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.",
    express:
      "Express.js is a back end web application framework for building RESTful APIs with Node.js.",
    expressjs:
      "Express.js is a back end web application framework for building RESTful APIs with Node.js.",
    django:
      "Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.",
    flask: "Flask is a micro web framework written in Python.",
    spring:
      "Spring Boot makes it easy to create stand-alone, production-grade Spring based Applications that you can 'just run'.",
    springboot:
      "Spring Boot makes it easy to create stand-alone, production-grade Spring based Applications that you can 'just run'.",
    laravel:
      "Laravel is a web application framework with expressive, elegant syntax.",
    sql: "SQL (Structured Query Language) is a dedicated programming language for communicating with databases.",
    mysql: "MySQL is an open-source relational database management system.",
    postgresql:
      "PostgreSQL is a powerful, open source object-relational database system.",
    postgres:
      "PostgreSQL is a powerful, open source object-relational database system.",
    mongodb:
      "MongoDB is a source-available cross-platform document-oriented database program.",
    mongo:
      "MongoDB is a source-available cross-platform document-oriented database program.",
    git: "Git is a distributed version control system to track changes in source code during software development.",
    github:
      "GitHub is a developer platform that allows developers to create, store, manage and share their code.",
    docker:
      "Docker is a set of platform as a service products that use OS-level virtualization to deliver software in packages called containers.",
    kubernetes:
      "Kubernetes is an open-source container-orchestration system for automating computer application deployment, scaling, and management.",
    aws: "Amazon Web Services (AWS) is a comprehensive, evolving cloud computing platform provided by Amazon.",
    azure:
      "Microsoft Azure is a cloud computing service created by Microsoft for building, testing, deploying, and managing applications and services.",
    googlecloud:
      "Google Cloud Platform (GCP), offered by Google, is a suite of cloud computing services.",
    gcp: "Google Cloud Platform (GCP), offered by Google, is a suite of cloud computing services.",
    linux:
      "Linux is a family of open-source Unix-like operating systems based on the Linux kernel.",
    ubuntu:
      "Ubuntu is a Linux distribution based on Debian and composed mostly of free and open-source software.",
  };

  return (
    techDescriptionMap[normalizedTechName] ||
    `${techName} is a technology topic used in software development.`
  );
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
  return num?.toString();
};
