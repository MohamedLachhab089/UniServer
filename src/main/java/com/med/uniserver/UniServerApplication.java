package com.med.uniserver;

import com.med.uniserver.entities.Server;
import com.med.uniserver.enums.Status;
import com.med.uniserver.repos.ServerRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class UniServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(UniServerApplication.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(ServerRepository serverRepository) {
        return args -> {
            serverRepository.save(new Server(null, "192.168.1.26", "Red Hat", "16 GB", "Local PC", "http://localhost:8081/server/image/server1.png", Status.SERVER_UP));
            serverRepository.save(new Server(null, "192.168.1.18", "Ubuntu", "16 GB", "DBA Server", "http://localhost:8081/server/image/server2.png", Status.SERVER_DOWN));
            serverRepository.save(new Server(null, "192.168.1.21", "MacOS", "18 GB", "Web Server", "http://localhost:8081/server/image/server3.png", Status.SERVER_UP));
            serverRepository.save(new Server(null, "192.168.1.159", "windows", "16 GB", "Mail Server", "http://localhost:8081/server/image/server4.png", Status.SERVER_DOWN));
        };
    }

}
