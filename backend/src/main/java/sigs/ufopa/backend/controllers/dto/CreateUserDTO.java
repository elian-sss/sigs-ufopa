package sigs.ufopa.backend.controllers.dto;

public record CreateUserDTO(String name, String email, String cpf, String password, String role) {
}
