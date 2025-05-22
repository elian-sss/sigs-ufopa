package sigs.ufopa.backend.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import sigs.ufopa.backend.entities.Role;
import sigs.ufopa.backend.entities.User;
import sigs.ufopa.backend.repositories.RoleRepository;
import sigs.ufopa.backend.repositories.UserRepository;

import java.util.Set;

@Configuration
public class AdminUserConfig implements CommandLineRunner {

    private RoleRepository roleRepository;
    private UserRepository userRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public AdminUserConfig(RoleRepository roleRepository, UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        var roleAdmin =  roleRepository.findByName(Role.Values.ADMIN.name());
        var userAdmin = userRepository.findByEmail("admin@email.com");

        userAdmin.ifPresentOrElse(
                (user) -> {
                    System.out.println("Admin user already exists!");
                },
                () -> {
                    var user = new User();
                    user.setName("Admin");
                    user.setEmail("admin@email.com");
                    user.setCpf("000.000.000-00");
                    user.setPassword(bCryptPasswordEncoder.encode("Admin@2025"));
                    user.setRoles(Set.of(roleAdmin));
                    userRepository.save(user);
                }
        );
    }
}
