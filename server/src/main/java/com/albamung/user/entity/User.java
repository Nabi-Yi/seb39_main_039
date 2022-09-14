package com.albamung.user.entity;

import com.albamung.helper.audit.BaseEntityDate;
import com.albamung.pet.entity.Pet;
import com.albamung.walk.entity.Walk;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "Users")
@NoArgsConstructor
@Data
@AllArgsConstructor
@Builder
@DynamicUpdate
@DynamicInsert
public class User extends BaseEntityDate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String provider;

    private String providerId;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, unique = true, updatable = false)
    private String email;

    @Column(nullable = false, unique = true)
    private String nickName;

    @Column(nullable = false)
    private String roles;

    @Column
    private String profileImage;

    @Column(nullable = true)
    private String fullName;

    @Column(nullable = true)
    private String location;

    @Column(nullable = true)
    private String aboutMe;

    private String refreshToken;
    @ColumnDefault("0")
    private Long grade;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.REMOVE)
    private List<Walk> walkOwnerList;

    @OneToMany(mappedBy = "walker", cascade = CascadeType.REMOVE)
    private List<Walk> walkWalkerList;

    @OneToMany(mappedBy = "owner" , cascade = CascadeType.REMOVE)
    private List<Pet> petList;


    public List<UserRole> getRoleList() {
        List<UserRole> roleList = new ArrayList<>();
        if (this.roles.length() == 0) return new ArrayList<>();
        for (String s : this.roles.split(",")) {
            roleList.add(UserRole.valueOf(s));
        }
        return roleList;
    }
}