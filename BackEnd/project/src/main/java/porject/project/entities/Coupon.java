package porject.project.entities;


import com.fasterxml.jackson.annotation.JsonFormat;
import porject.project.enums.Category;

import java.util.Date;
import java.util.Objects;

import javax.persistence.*;

@Entity
@Table(name = "coupons")

public class Coupon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String title;
    @Enumerated(EnumType.ORDINAL)
    private Category category;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @Temporal(TemporalType.DATE)
    private Date startDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @Temporal(TemporalType.DATE)
    private Date endDate;
    private int amount;
    private String description;
    private double price;
    @Column(columnDefinition = "LONGTEXT")
    private String image;
    @ManyToOne
    private Company company;


    public Coupon() {
    }

    public Coupon(int id, String title, Category category, Date startDate, Date endDate, int amount, String description, double price, String image) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.startDate = startDate;
        this.endDate = endDate;
        this.amount = amount;
        this.description = description;
        this.price = price;
        this.image = image;
    }


    public int getId() {
        return id;
    }


    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    @Override
    public String toString() {
        return "Coupon{" +
                "title='" + title + '\'' +
                ", category=" + category +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", amount=" + amount +
                ", message='" + description + '\'' +
                ", price=" + price +
                ", image='" + image + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Coupon coupon = (Coupon) o;
        return id == coupon.id && amount == coupon.amount && Double.compare(coupon.price, price) == 0 && Objects.equals(title, coupon.title) && category == coupon.category && Objects.equals(description, coupon.description) && Objects.equals(image, coupon.image);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, category, amount, description, price, image);
    }
}







