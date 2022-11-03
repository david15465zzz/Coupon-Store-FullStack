package porject.project.repostiories;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



import porject.project.entities.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {

    Customer findByEmail(String email );


}