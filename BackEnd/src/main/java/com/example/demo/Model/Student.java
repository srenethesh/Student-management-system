package com.example.demo.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "students")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id;
    @Column(name="First_Name")
    private String firstName;
    @Column(name="Last_Name")
    private String lastName;
    @Column(name = "email_id",unique = true,nullable = false)
    private String email;
    @Column(name="Department_Name")
    private String department;
    @Column(name="Course_Fee")
    private long courseFee;

    public long getId() {
        return Id;
    }
    public void setId(Long Id){
        this.Id=Id;
    }

    public String getFirstName(){
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    public String getLastName(){
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail(){
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    public String getDepartment(){
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public long getCourseFee() {
        return courseFee;
    }

    public void setCourseFee(long courseFee) {
        this.courseFee = courseFee;
    }
}
