FROM ubuntu:22.04

# Set environment variables
ENV DEBIAN_FRONTEND=noninteractive
ENV LANG=C.UTF-8

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    git \
    build-essential \
    ca-certificates \
    gnupg \
    lsb-release \
    apt-transport-https \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Node.js (for Next.js)
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Java 17
RUN apt-get update && apt-get install -y \
    openjdk-17-jdk \
    openjdk-17-jdk-headless \
    && apt-get clean && rm -rf /var/lib/apt/lists*

# Install Maven
RUN apt-get update && apt-get install -y \
    maven \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PostgreSQL client
RUN apt-get update && apt-get install -y \
    postgresql-client \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Docker CLI (for remote container access)
RUN curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add - \
    && apt-get update && apt-get install -y \
    docker.io \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Create vscode user
RUN useradd -m -s /bin/bash vscode \
    && apt-get update && apt-get install -y sudo \
    && echo "vscode ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /workspace

# Install npm packages globally (before switching user)
RUN npm install -g yarn pnpm

# Switch to vscode user
USER vscode

# Set Java environment
ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
ENV PATH=$JAVA_HOME/bin:$PATH

# Keep container running
CMD ["/bin/bash"]
