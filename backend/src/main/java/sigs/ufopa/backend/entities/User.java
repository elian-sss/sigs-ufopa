package sigs.ufopa.backend.entities;

import jakarta.persistence.*;

import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String name;
    @Column(unique = true)
    private String cpf;

    @Column(unique = true, nullable = false)
    private String email;
    private String password;

    private Set<Role> roles;

}
