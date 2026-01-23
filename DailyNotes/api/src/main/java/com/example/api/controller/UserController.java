package com.example.api.controller;

import com.example.api.model.User;
import com.example.api.model.UserRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * ユーザーAPIコントローラー
 */
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Validated
public class UserController {

    private final UserRepository userRepository;

    /**
     * すべてのユーザーを取得
     */
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }

    /**
     * IDでユーザーを取得
     */
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        Optional<User> user = userRepository.findById(id);
        return user.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * 新しいユーザーを作成
     */
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody @Valid User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
        User savedUser = userRepository.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }

    /**
     * ユーザーを更新
     */
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody @Valid User userDetails) {
        Optional<User> userOptional = userRepository.findById(id);
        
        if (userOptional.isPresent()) {
            User user = userOptional.get();

            // 新しいメールアドレスが他のユーザーによって使用されていないか確認
            Optional<User> userWithEmail = userRepository.findByEmail(userDetails.getEmail());
            if (userWithEmail.isPresent() && !userWithEmail.get().getId().equals(id)) {
                return ResponseEntity.status(HttpStatus.CONFLICT).build();
            }

            user.setName(userDetails.getName());
            user.setEmail(userDetails.getEmail());
            user.setPhone(userDetails.getPhone());
            user.setAge(userDetails.getAge());
            
            User updatedUser = userRepository.save(user);
            return ResponseEntity.ok(updatedUser);
        }
        
        return ResponseEntity.notFound().build();
    }

    /**
     * ユーザーを削除
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    /**
     * メールアドレスでユーザーを検索
     */
    @GetMapping("/search/email")
    public ResponseEntity<User> getUserByEmail(@RequestParam @NotBlank @Email String email) {
        Optional<User> user = userRepository.findByEmail(email);
        return user.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
