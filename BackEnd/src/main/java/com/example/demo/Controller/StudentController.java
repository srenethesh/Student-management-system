package com.example.demo.Controller;
import java.util.List;
import java.util.Optional;

import com.example.demo.Model.Student;
import com.example.demo.Repository.StudentRepository;
import jakarta.persistence.Id;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@CrossOrigin("*")
@RestController
public class StudentController {
    @Autowired
    StudentRepository studentRepository;
    @GetMapping("/get/{id}")
    public ResponseEntity<Student> getIdDetails(@PathVariable("id") Long id) {
        Optional<Student> student = studentRepository.findById(id);
        return student.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/get")
    public List<Student> getDetails(){
        return studentRepository.findAll();
    }
    @PostMapping("/post")
    public Student postDetails(@RequestBody Student students){
        return studentRepository.save(students);
    }
    @PutMapping("/put/{Id}")
    public Student putDetails(@PathVariable Long Id,@RequestBody Student updatedStudent){
        return studentRepository.findById(Id).map(student -> {
            student.setFirstName(updatedStudent.getFirstName());
            student.setLastName(updatedStudent.getLastName());
            student.setEmail(updatedStudent.getEmail());
            student.setDepartment(updatedStudent.getDepartment());
            student.setCourseFee(updatedStudent.getCourseFee());
            return studentRepository.save(student);
        }).orElseThrow(() -> new RuntimeException("Student is not found"));
    }

    @DeleteMapping("/delete/{Id}")
    public String deleteDetails(@PathVariable Long Id){
        if (studentRepository.existsById(Id)) {
            studentRepository.deleteById(Id);
            return "Student Detail deleted successfully";
        }else{
            return "Student Id is not found";
        }
    }
}
