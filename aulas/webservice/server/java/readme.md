Web Service com Java Servlets
=============================

1. Crie um projeto com o comando maven: 
```bash
mvn archetype:generate  -DgroupId=com.projeto  -DartifactId=Exemplo -DarchetypeArtifactId=maven-archetype-webapp  -DinteractiveMode=false
```
2. Crie a tag \<plugins\> no arquivo [pom.xml](./pom.xml) dentro da tag \<build\> 
```xml
<build>

<plugins>

  <!-- Para versão correta do java: Plugin maven --> 
  <plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-compiler-plugin</artifactId>
    <version>3.1</version>
    <configuration>
        <source>1.7</source>
        <target>1.7</target>
    </configuration>
  </plugin>

  <!-- Para gerar  projeto Eclipse -->
  <plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-eclipse-plugin</artifactId>
    <version>2.9</version>
    <configuration>
      <downloadSources>true</downloadSources>
      <downloadJavadocs>false</downloadJavadocs>
      <wtpversion>2.0</wtpversion>
    </configuration>
  </plugin>
  
  <!-- Para instalar o Servlet Container: Tomcat Plugin -->
  <plugin>
    <groupId>org.apache.tomcat.maven</groupId>
    <artifactId>tomcat7-maven-plugin</artifactId>
    <version>2.2</version>
    <configuration>
      <path>/</path>
    </configuration>
    </plugin>
    
</plugins>

</build>
```
3. (Opcional) Crie uma versão do projeto para o eclipse : 
```bash
mvn eclipse:eclipse
```
   Só para quem quiser editar o código no eclipse

4. Rode o comando para levantar o servidor web:
```bash
mvn tomcat7:run -Dmaven.tomcat.port=3000
```

Para acessar o website abra o endereço http://localhost:3000/ no navegador web de sua preferência.
