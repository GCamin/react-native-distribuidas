# MoviePlay App Mobile

## Descripción
MoviePlay es una aplicación móvil para ver y recomendar películas entre usuarios.


## Integrantes del Grupo
- Gian Camin
- Martín Ariel Carril
- Lorena Soledad Tuhay
- Santiago Pedro Viñas


## Configuración del entorno

EN WINDOWS

### Instalar Chocolatey: (https://chocolatey.org/install)
    
### Instalar Node y JDK

Instalar Node LTS usando Chocolatey y JDK usando el siguiente comando en una ventana de comandos con privilegios de administrador:

    ```
    choco install -y nodejs-lts microsoft-openjdk17
    ```

Asegurarse de que Node sea la versión LTS. Si ya está instalado Node, verificar que sea la versión 18 o superior.

### Instalar React Native CLI

    ```
    npm install -g react-native-cli
    ```


### Descargar e instalar Android Studio: https://developer.android.com/studio?hl=es-419

Durante la instalación, asegurarse de seleccionar los siguientes componentes:

Android SDK
Android SDK Platform
Android Virtual Device (AVD)

Android Studio instala automáticamente la última versión del Android SDK por defecto. Sin embargo, para desarrollar una aplicación React Native con código nativo, es necesario contar específicamente con el Android 14 (UpsideDownCake) SDK. Se pueden instalar SDK adicionales a través del SDK Manager en Android Studio.
Para hacerlo, abrir Android Studio, clic en el botón "Más acciones" y seleccionar "SDK Manager".El SDK Manager también se puede encontrar dentro del diálogo de "Configuración" de Android Studio, bajo Idiomas y frameworks → Android SDK. Seleccionar la pestaña "SDK Platforms" dentro del SDK Manager, luego marca la casilla "Mostrar detalles del paquete" en la esquina inferior derecha. Buscar y expandir la entrada Android 14 (UpsideDownCake), luego asegurarse de que estén marcados los siguientes elementos:

Plataforma Android SDK 34
Intel x86 Atom_64 System Image or Google APIs Intel x86 Atom System Image

A continuación, seleccionar la pestaña "SDK Tools" y marcar la casilla "Mostrar detalles del paquete" aquí también. Buscar y expandir la entrada "Android SDK Build-Tools", luego asegurarse de que esté seleccionada la versión 34.0.0.Finalmente, hacer clic en "Aplicar" para descargar e instalar el Android SDK y las herramientas de compilación relacionadas.

### Configurar ANDROID_HOME

Abrir el Panel de Control de Windows.
Ir a Cuentas de Usuario -> Cuentas de Usuario.
Hacer clic en "Cambiar mis variables de entorno".
Crear una nueva variable de usuario ANDROID_HOME apuntando a la ubicación del SDK de Android (por defecto %LOCALAPPDATA%\Android\Sdk).
Agregar platform-tools al Path

En el Panel de Control de Windows, ir a Cuentas de Usuario -> Cuentas de Usuario -> Cambiar mis variables de entorno.
Seleccionar la variable Path.
Hacer clic en Editar y agrega la ruta %LOCALAPPDATA%\Android\Sdk\platform-tools.




EN MAC

### Instalar Homebrew: https://brew.sh/

### Instalar Node y Watchman

    ```
    brew install node
    brew install watchman
    ```

### Instalar OpenJDK Azul Zulu

    ```
    brew install --cask zulu@17

    # Obtener la ruta donde se instaló el paquete para ejecutar el instalador al hacer doble clic
    brew info --cask zulu@17
    ```

Después de la instalación del JDK, agregar o actualizar la variable de entorno JAVA_HOME en ~/.zshrc (o en ~/.bash_profile). Si se siguieron los pasos anteriores, es probable que el JDK se encuentre en /Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home:

export JAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home

La distribución Zulu OpenJDK ofrece JDK para Macs tanto Intel como M1. Esto asegurará que tus compilaciones sean más rápidas en Macs con M1 en comparación con el uso de un JDK basado en Intel. Si ya está instalado JDK en el sistema, se recomienda JDK 17.

### Descargar e instalar Android Studio: https://developer.android.com/studio?hl=es-419

Durante la instalación, asegurarse de seleccionar los siguientes componentes:

Android SDK
Android SDK Platform
Android Virtual Device (AVD)

Android Studio instala automáticamente la última versión del Android SDK por defecto. Sin embargo, para desarrollar una aplicación React Native con código nativo, es necesario contar específicamente con el Android 14 (UpsideDownCake) SDK. Se pueden instalar SDK adicionales a través del SDK Manager en Android Studio.
Para hacerlo, abrir Android Studio, clic en el botón "Más acciones" y seleccionar "SDK Manager".El SDK Manager también se puede encontrar dentro del diálogo de "Configuración" de Android Studio, bajo Idiomas y frameworks → Android SDK. Seleccionar la pestaña "SDK Platforms" dentro del SDK Manager, luego marca la casilla "Mostrar detalles del paquete" en la esquina inferior derecha. Buscar y expandir la entrada Android 14 (UpsideDownCake), luego asegurarse de que estén marcados los siguientes elementos:

Plataforma Android SDK 34
Imagen del sistema Intel x86 Atom_64 o Google APIs Intel x86 Atom o (para Apple M1 Silicon) Google APIs ARM 64 v8a

A continuación, seleccionar la pestaña "SDK Tools" y marcar la casilla "Mostrar detalles del paquete" aquí también. Buscar y expandir la entrada "Android SDK Build-Tools", luego asegurarse de que esté seleccionada la versión 34.0.0.Finalmente, hacer clic en "Aplicar" para descargar e instalar el Android SDK y las herramientas de compilación relacionadas.

### Configurar ANDROID_HOME

Agregar las siguientes líneas al archivo de configuración ~/.zprofile o ~/.zshrc (si se está usando bash, entonces ~/.bash_profile o ~/.bashrc):

    ```
    export ANDROID_HOME=$HOME/Library/Android/sdk
    export PATH=$PATH:$ANDROID_HOME/emulator
    export PATH=$PATH:$ANDROID_HOME/platform-tools
    ```
Ejecutar source ~/.zprofile (o source ~/.bash_profile si estás usando bash) para cargar la configuración en tu shell actual. Verificar que se haya configurado ANDROID_HOME ejecutando echo $ANDROID_HOME y que los directorios apropiados se hayan añadido a tu ruta ejecutando echo $PATH.


## Instalar dependencias

    ```
    npm install
    ```
## Instalar paquetes necesarios:

    ```
    @react-navigation/native-stack
    @react-navigation/native
    react-native-image-picker
    react-native-gesture-handler
    @react-native-firebase/app @react-native-firebase/auth
    @react-native-google-signin/google-signin
    react-native-svg-transformer
    @react-native-community/netinfo
    ```

## Correr la aplicación en Android:

    ```
    npx react-native run-android
    ```

Se debe tener un dispositivo físico conectado o un emulador abierto para Android Studio o Xcode.