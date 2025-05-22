package sigs.ufopa.backend.controllers.dto;

public record LoginResponse(String accesToken, Long expiresIn) {
}
