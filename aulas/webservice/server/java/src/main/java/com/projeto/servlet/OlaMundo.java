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
