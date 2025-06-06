package sigs.ufopa.backend.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "roles")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public enum Values {
        ADMIN(1L),
        COORDENADOR(2L),
        SEGURANCA(3L),
        USUARIO(4L);

        long roleId;

        Values(long roleId) {
            this.roleId = roleId;
        }

        public long getRoleId() {
            return roleId;
        }

        public void setRoleId(long roleId) {
            this.roleId = roleId;
        }
    }
}
