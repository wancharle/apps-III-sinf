# Web Service com Java Servlets

## Parte 1
Exemplo básico de servidor web em java.

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

## Parte 2
Ajustes para usar servlets e liberar compartilhamento de recursos de origem cruzada (CORS - Cross Origin Resource Sharing).

1. Remova o arquivo index.jsp da pasta [webapp](src/main/webapp/):
```bash
rm src/main/webapp/index.jsp
```

2. Crie o arquivo [OlaMundo.java](/src/main/java/com/projeto/servlet/OlaMundo.java) na pasta [servlet](src/main/java/com/projeto/servlet/) do pacote com.projeto.servlet.
```bash
mkdir -p src/main/java/com/projeto/servlet/
editor-de-sua-preferencia src/main/java/com/projeto/servlet/OlaMundo.java
```

3. Escreva o seguinte código no arquivo OlaMundo.java:
```Java
package com.projeto.servlet;

import javax.servlet.http.*;
import javax.servlet.ServletException; 
import java.io.IOException; 
import java.io.PrintWriter; 
import javax.servlet.annotation.WebServlet; 
 
@WebServlet("/") 
public class OlaMundo extends HttpServlet { 
    @Override 
    protected void service (HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException { 
 
        response.setCharacterEncoding("UTF-8");
        liberaAccesso(response);
        PrintWriter out = response.getWriter(); 

        out.println("Olá Mundo java!"); 
    } 

    public void liberaAccesso(HttpServletResponse response){
         response.addHeader("Access-Control-Allow-Origin", "*"); 
         response.addHeader("Access-Control-Allow-Credentials", "true");
         response.addHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    }
} 
```

3. Adicione as dependências do projeto dentro da  tag \<dependencies\> do arquivo [pom.xml](pom.xml):
```xml
<!--  Servlet: Para fazer paginas web -->
<dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>javax.servlet-api</artifactId>
    <version>3.0.1</version>
    <scope>provided</scope>
</dependency>

<!--  Gson: Java to Json conversion -->
  <dependency>
    <groupId>com.google.code.gson</groupId>
    <artifactId>gson</artifactId>
    <version>2.8.0</version>
    <scope>compile</scope>
  </dependency>
```

4. Rode o comando para levantar o servidor web (se ja estiver rodando pressione CTRL+C para parar e rode novamente):
```bash
mvn tomcat7:run -Dmaven.tomcat.port=3000
```

Para acessar o website abra o endereço http://localhost:3000/ no navegador web de sua preferência.
 
