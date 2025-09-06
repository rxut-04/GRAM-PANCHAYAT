// small enhancement — update year automatically
      document.getElementById("yr").textContent = new Date().getFullYear();

      // MOPR Navigation functionality
      document.addEventListener("DOMContentLoaded", function () {
        // Mobile menu toggle with enhanced animations and touch support
        const mobileToggle = document.querySelector(".mobile-menu-toggle");
        const navMenu = document.querySelector(".nav-menu");

        if (mobileToggle && navMenu) {
          // Enhanced mobile menu toggle with better touch support
          mobileToggle.addEventListener("click", function (e) {
            e.preventDefault();
            const isExpanded = this.getAttribute("aria-expanded") === "true";
            this.setAttribute("aria-expanded", !isExpanded);
            navMenu.classList.toggle("mobile-open");

            // Add smooth animation class
            navMenu.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";

            // Prevent body scroll when mobile menu is open
            if (!isExpanded) {
              document.body.style.overflow = "hidden";
              // Focus management for accessibility
              setTimeout(() => {
                const firstNavLink = navMenu.querySelector(".nav-link");
                if (firstNavLink) firstNavLink.focus();
              }, 300);
            } else {
              document.body.style.overflow = "";
            }

            // Add haptic feedback for mobile devices
            if (navigator.vibrate) {
              navigator.vibrate(50);
            }
          });

          // Enhanced touch event handling for better mobile experience
          let touchStartY = 0;
          let touchEndY = 0;

          mobileToggle.addEventListener(
            "touchstart",
            function (e) {
              touchStartY = e.touches[0].clientY;
              this.style.transform = "scale(0.95)";
            },
            { passive: true }
          );

          mobileToggle.addEventListener(
            "touchend",
            function (e) {
              touchEndY = e.changedTouches[0].clientY;
              this.style.transform = "scale(1)";

              // Prevent accidental activation from scrolling
              const touchDiff = Math.abs(touchStartY - touchEndY);
              if (touchDiff > 10) {
                e.preventDefault();
                return false;
              }
            },
            { passive: false }
          );

          // Enhanced keyboard support for mobile toggle
          mobileToggle.addEventListener("keydown", function (e) {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              this.click();
            }
            // Close menu with Escape key
            if (e.key === "Escape") {
              const isExpanded = this.getAttribute("aria-expanded") === "true";
              if (isExpanded) {
                this.setAttribute("aria-expanded", "false");
                navMenu.classList.remove("mobile-open");
                document.body.style.overflow = "";
                this.focus();
              }
            }
          });

          // Close mobile menu when clicking outside
          document.addEventListener("click", function (e) {
            if (window.innerWidth <= 768) {
              const isExpanded =
                mobileToggle.getAttribute("aria-expanded") === "true";
              if (
                isExpanded &&
                !navMenu.contains(e.target) &&
                !mobileToggle.contains(e.target)
              ) {
                mobileToggle.setAttribute("aria-expanded", "false");
                navMenu.classList.remove("mobile-open");
                document.body.style.overflow = "";
              }
            }
          });

          // Handle swipe gestures to close mobile menu
          let swipeStartX = 0;
          let swipeStartY = 0;

          navMenu.addEventListener(
            "touchstart",
            function (e) {
              swipeStartX = e.touches[0].clientX;
              swipeStartY = e.touches[0].clientY;
            },
            { passive: true }
          );

          navMenu.addEventListener(
            "touchmove",
            function (e) {
              if (window.innerWidth <= 768) {
                const swipeX = e.touches[0].clientX - swipeStartX;
                const swipeY = e.touches[0].clientY - swipeStartY;

                // Close menu on upward swipe
                if (swipeY < -100 && Math.abs(swipeX) < 50) {
                  mobileToggle.setAttribute("aria-expanded", "false");
                  navMenu.classList.remove("mobile-open");
                  document.body.style.overflow = "";
                }
              }
            },
            { passive: true }
          );
        }

        // Enhanced dropdown menu functionality with smooth animations
        const dropdownToggles = document.querySelectorAll(".dropdown-toggle");
        const dropdownMenus = document.querySelectorAll(".dropdown-menu");

        // Add transition styles to all dropdown menus
        dropdownMenus.forEach((menu) => {
          menu.style.transition =
            "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
        });

        dropdownToggles.forEach((toggle) => {
          // Enhanced click handler for dropdown toggles
          toggle.addEventListener("click", function (e) {
            e.preventDefault();
            const isExpanded = this.getAttribute("aria-expanded") === "true";
            const dropdownMenu = this.nextElementSibling;

            // Close all other dropdowns with animation
            dropdownToggles.forEach((otherToggle) => {
              if (otherToggle !== this) {
                otherToggle.setAttribute("aria-expanded", "false");
                const otherMenu = otherToggle.nextElementSibling;
                if (otherMenu) {
                  otherMenu.style.opacity = "0";
                  otherMenu.style.visibility = "hidden";
                  otherMenu.style.transform = "translateY(-10px)";
                }
              }
            });

            // Toggle current dropdown with smooth animation
            this.setAttribute("aria-expanded", !isExpanded);
            if (dropdownMenu) {
              if (!isExpanded) {
                dropdownMenu.style.opacity = "1";
                dropdownMenu.style.visibility = "visible";
                dropdownMenu.style.transform = "translateY(0)";
              } else {
                dropdownMenu.style.opacity = "0";
                dropdownMenu.style.visibility = "hidden";
                dropdownMenu.style.transform = "translateY(-10px)";
              }
            }
          });

          // Enhanced keyboard navigation support
          toggle.addEventListener("keydown", function (e) {
            const dropdownMenu = this.nextElementSibling;
            const menuItems = dropdownMenu
              ? dropdownMenu.querySelectorAll("a[role='menuitem']")
              : [];

            switch (e.key) {
              case "Enter":
              case " ":
                e.preventDefault();
                this.click();
                // Focus first menu item when opening dropdown
                if (
                  this.getAttribute("aria-expanded") === "true" &&
                  menuItems.length > 0
                ) {
                  setTimeout(() => menuItems[0].focus(), 100);
                }
                break;
              case "Escape":
                e.preventDefault();
                this.setAttribute("aria-expanded", "false");
                if (dropdownMenu) {
                  dropdownMenu.style.opacity = "0";
                  dropdownMenu.style.visibility = "hidden";
                  dropdownMenu.style.transform = "translateY(-10px)";
                }
                this.focus();
                break;
              case "ArrowDown":
                e.preventDefault();
                if (this.getAttribute("aria-expanded") === "false") {
                  this.click();
                }
                if (menuItems.length > 0) {
                  setTimeout(() => menuItems[0].focus(), 100);
                }
                break;
              case "ArrowUp":
                e.preventDefault();
                if (this.getAttribute("aria-expanded") === "false") {
                  this.click();
                }
                if (menuItems.length > 0) {
                  setTimeout(
                    () => menuItems[menuItems.length - 1].focus(),
                    100
                  );
                }
                break;
            }
          });

          // Enhanced hover effects with smooth transitions
          toggle.addEventListener("mouseenter", function () {
            if (window.innerWidth > 768) {
              this.style.transition = "all 0.2s ease";
              this.style.transform = "translateY(-1px)";
              this.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.15)";
            }
          });

          toggle.addEventListener("mouseleave", function () {
            if (window.innerWidth > 768) {
              this.style.transform = "translateY(0)";
              this.style.boxShadow = "none";
            }
          });
        });

        // Enhanced keyboard navigation for dropdown menu items
        const dropdownLinks = document.querySelectorAll(
          ".dropdown-menu a[role='menuitem']"
        );
        dropdownLinks.forEach((link, index, array) => {
          link.addEventListener("keydown", function (e) {
            const parentDropdown = this.closest(".has-dropdown");
            const toggle = parentDropdown
              ? parentDropdown.querySelector(".dropdown-toggle")
              : null;

            switch (e.key) {
              case "ArrowDown":
                e.preventDefault();
                const nextIndex = (index + 1) % array.length;
                if (
                  array[nextIndex] &&
                  array[nextIndex].closest(".dropdown-menu") ===
                    this.closest(".dropdown-menu")
                ) {
                  array[nextIndex].focus();
                } else {
                  // Find next item in same dropdown
                  const currentDropdown = this.closest(".dropdown-menu");
                  const currentDropdownLinks =
                    currentDropdown.querySelectorAll("a[role='menuitem']");
                  const currentIndex =
                    Array.from(currentDropdownLinks).indexOf(this);
                  const nextItem =
                    currentDropdownLinks[
                      (currentIndex + 1) % currentDropdownLinks.length
                    ];
                  if (nextItem) nextItem.focus();
                }
                break;
              case "ArrowUp":
                e.preventDefault();
                const prevIndex = (index - 1 + array.length) % array.length;
                if (
                  array[prevIndex] &&
                  array[prevIndex].closest(".dropdown-menu") ===
                    this.closest(".dropdown-menu")
                ) {
                  array[prevIndex].focus();
                } else {
                  // Find previous item in same dropdown
                  const currentDropdown = this.closest(".dropdown-menu");
                  const currentDropdownLinks =
                    currentDropdown.querySelectorAll("a[role='menuitem']");
                  const currentIndex =
                    Array.from(currentDropdownLinks).indexOf(this);
                  const prevItem =
                    currentDropdownLinks[
                      (currentIndex - 1 + currentDropdownLinks.length) %
                        currentDropdownLinks.length
                    ];
                  if (prevItem) prevItem.focus();
                }
                break;
              case "Escape":
                e.preventDefault();
                if (toggle) {
                  toggle.setAttribute("aria-expanded", "false");
                  const dropdownMenu = toggle.nextElementSibling;
                  if (dropdownMenu) {
                    dropdownMenu.style.opacity = "0";
                    dropdownMenu.style.visibility = "hidden";
                    dropdownMenu.style.transform = "translateY(-10px)";
                  }
                  toggle.focus();
                }
                break;
              case "Tab":
                // Allow natural tab behavior but close dropdown
                if (toggle) {
                  setTimeout(() => {
                    toggle.setAttribute("aria-expanded", "false");
                    const dropdownMenu = toggle.nextElementSibling;
                    if (dropdownMenu) {
                      dropdownMenu.style.opacity = "0";
                      dropdownMenu.style.visibility = "hidden";
                      dropdownMenu.style.transform = "translateY(-10px)";
                    }
                  }, 100);
                }
                break;
            }
          });

          // Enhanced hover effects for dropdown links
          link.addEventListener("mouseenter", function () {
            this.style.transition = "all 0.2s ease";
            this.style.paddingLeft = "2rem";
          });

          link.addEventListener("mouseleave", function () {
            this.style.paddingLeft = "1.5rem";
          });
        });

        // Enhanced click outside to close dropdowns
        document.addEventListener("click", function (e) {
          if (!e.target.closest(".has-dropdown")) {
            dropdownToggles.forEach((toggle) => {
              toggle.setAttribute("aria-expanded", "false");
              const dropdownMenu = toggle.nextElementSibling;
              if (dropdownMenu) {
                dropdownMenu.style.opacity = "0";
                dropdownMenu.style.visibility = "hidden";
                dropdownMenu.style.transform = "translateY(-10px)";
              }
            });
          }
        });

        // Enhanced mobile menu link behavior with better touch support
        const navLinks = document.querySelectorAll(".nav-link");
        navLinks.forEach((link) => {
          // Enhanced click handling for mobile
          link.addEventListener("click", function (e) {
            if (window.innerWidth <= 768) {
              // Only close menu if it's not a dropdown toggle
              if (!this.classList.contains("dropdown-toggle")) {
                navMenu.classList.remove("mobile-open");
                mobileToggle.setAttribute("aria-expanded", "false");
                document.body.style.overflow = "";
              }
            }
          });

          // Enhanced touch feedback for mobile nav links
          link.addEventListener(
            "touchstart",
            function (e) {
              if (window.innerWidth <= 768) {
                this.style.background = "var(--brand-2)";
                this.style.transform = "scale(0.98)";
              }
            },
            { passive: true }
          );

          link.addEventListener(
            "touchend",
            function (e) {
              if (window.innerWidth <= 768) {
                setTimeout(() => {
                  this.style.background = "";
                  this.style.transform = "";
                }, 150);
              }
            },
            { passive: true }
          );

          // Add focus indicators for better accessibility
          link.addEventListener("focus", function () {
            this.style.outline = "2px solid rgba(255, 255, 255, 0.8)";
            this.style.outlineOffset = "-2px";
          });

          link.addEventListener("blur", function () {
            this.style.outline = "none";
          });
        });

        // Enhanced window resize handler with mobile optimization
        let resizeTimeout;
        window.addEventListener("resize", function () {
          clearTimeout(resizeTimeout);
          resizeTimeout = setTimeout(() => {
            if (window.innerWidth > 768) {
              navMenu.classList.remove("mobile-open");
              mobileToggle.setAttribute("aria-expanded", "false");
              document.body.style.overflow = "";

              dropdownToggles.forEach((toggle) => {
                toggle.setAttribute("aria-expanded", "false");
                const dropdownMenu = toggle.nextElementSibling;
                if (dropdownMenu) {
                  dropdownMenu.style.opacity = "0";
                  dropdownMenu.style.visibility = "hidden";
                  dropdownMenu.style.transform = "translateY(-10px)";
                }
              });
            }
          }, 100);
        });

        // Mobile-specific optimizations
        if ("ontouchstart" in window) {
          // Add touch-specific class for enhanced mobile styling
          document.body.classList.add("touch-device");

          // Optimize scroll performance on mobile
          let ticking = false;
          function updateScrollPosition() {
            if (
              window.innerWidth <= 768 &&
              navMenu.classList.contains("mobile-open")
            ) {
              // Prevent background scroll when mobile menu is open
              document.body.style.position = "fixed";
              document.body.style.top = `-${window.scrollY}px`;
              document.body.style.width = "100%";
            }
            ticking = false;
          }

          // Handle orientation change for mobile devices
          window.addEventListener("orientationchange", function () {
            setTimeout(() => {
              if (window.innerWidth > 768) {
                navMenu.classList.remove("mobile-open");
                mobileToggle.setAttribute("aria-expanded", "false");
                document.body.style.overflow = "";
                document.body.style.position = "";
                document.body.style.top = "";
                document.body.style.width = "";
              }
            }, 100);
          });
        }

        // Enhanced hover behavior for desktop with smooth animations
        const hasDropdownItems = document.querySelectorAll(".has-dropdown");

        hasDropdownItems.forEach((item) => {
          let hoverTimeout;

          item.addEventListener("mouseenter", function () {
            if (window.innerWidth > 768) {
              clearTimeout(hoverTimeout);
              const toggle = this.querySelector(".dropdown-toggle");
              const dropdownMenu = this.querySelector(".dropdown-menu");

              if (toggle && dropdownMenu) {
                toggle.setAttribute("aria-expanded", "true");
                dropdownMenu.style.opacity = "1";
                dropdownMenu.style.visibility = "visible";
                dropdownMenu.style.transform = "translateY(0)";
              }
            }
          });

          item.addEventListener("mouseleave", function () {
            if (window.innerWidth > 768) {
              hoverTimeout = setTimeout(() => {
                const toggle = this.querySelector(".dropdown-toggle");
                const dropdownMenu = this.querySelector(".dropdown-menu");

                if (toggle && dropdownMenu) {
                  toggle.setAttribute("aria-expanded", "false");
                  dropdownMenu.style.opacity = "0";
                  dropdownMenu.style.visibility = "hidden";
                  dropdownMenu.style.transform = "translateY(-10px)";
                }
              }, 150);
            }
          });
        });

        // Add ARIA live region for screen readers with mobile announcements
        const ariaLiveRegion = document.createElement("div");
        ariaLiveRegion.setAttribute("aria-live", "polite");
        ariaLiveRegion.setAttribute("aria-atomic", "true");
        ariaLiveRegion.style.position = "absolute";
        ariaLiveRegion.style.left = "-10000px";
        ariaLiveRegion.style.width = "1px";
        ariaLiveRegion.style.height = "1px";
        ariaLiveRegion.style.overflow = "hidden";
        document.body.appendChild(ariaLiveRegion);

        // Mobile menu state announcements
        if (mobileToggle) {
          const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
              if (
                mutation.type === "attributes" &&
                mutation.attributeName === "aria-expanded"
              ) {
                const isExpanded =
                  mobileToggle.getAttribute("aria-expanded") === "true";
                ariaLiveRegion.textContent = isExpanded
                  ? "Mobile navigation menu opened"
                  : "Mobile navigation menu closed";
              }
            });
          });

          observer.observe(mobileToggle, {
            attributes: true,
            attributeFilter: ["aria-expanded"],
          });
        }

        // Announce dropdown state changes to screen readers
        dropdownToggles.forEach((toggle) => {
          const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
              if (
                mutation.type === "attributes" &&
                mutation.attributeName === "aria-expanded"
              ) {
                const isExpanded =
                  toggle.getAttribute("aria-expanded") === "true";
                const menuName = toggle.textContent.trim().replace(/▼/g, "");
                ariaLiveRegion.textContent = isExpanded
                  ? `${menuName} menu expanded`
                  : `${menuName} menu collapsed`;
              }
            });
          });

          observer.observe(toggle, {
            attributes: true,
            attributeFilter: ["aria-expanded"],
          });
        });

        // Mann Ki Baat Image Slideshow functionality
        const slides = document.querySelectorAll(".slide");
        const indicators = document.querySelectorAll(".indicator");
        const prevBtn = document.getElementById("prevSlide");
        const nextBtn = document.getElementById("nextSlide");
        const playPauseBtn = document.getElementById("playPauseBtn");

        let currentSlideIndex = 0;
        let isPlaying = true;
        let slideInterval;

        // Initialize slideshow with performance optimizations
        function initSlideshow() {
          showSlide(0);
          startSlideshow();

          // Set up intersection observer for lazy loading
          if ("IntersectionObserver" in window) {
            const imageObserver = new IntersectionObserver(
              (entries) => {
                entries.forEach((entry) => {
                  if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                      img.src = img.dataset.src;
                      img.removeAttribute("data-src");
                      imageObserver.unobserve(img);
                    }
                  }
                });
              },
              {
                rootMargin: "50px",
              }
            );

            // Observe all lazy images
            document.querySelectorAll("img[data-src]").forEach((img) => {
              imageObserver.observe(img);
            });
          } else {
            // Fallback for browsers without IntersectionObserver
            document.querySelectorAll("img[data-src]").forEach((img) => {
              img.src = img.dataset.src;
              img.removeAttribute("data-src");
            });
          }

          // Preload next few images for smoother transitions
          setTimeout(() => {
            preloadAdjacentImages(0);
          }, 1000);
        }

        // Preload adjacent images for better performance
        function preloadAdjacentImages(currentIndex) {
          const preloadRange = 2; // Preload 2 images ahead and behind

          for (let i = -preloadRange; i <= preloadRange; i++) {
            const index = (currentIndex + i + slides.length) % slides.length;
            const slide = slides[index];
            const img = slide?.querySelector("img[data-src]");

            if (img) {
              const preloadImg = new Image();
              preloadImg.src = img.dataset.src;
              img.src = img.dataset.src;
              img.removeAttribute("data-src");
            }
          }
        }

        // Show specific slide with enhanced accessibility
        function showSlide(index) {
          // Remove active class from all slides and indicators
          slides.forEach((slide, i) => {
            slide.classList.remove("active");
            slide.setAttribute("aria-hidden", "true");
            // Lazy load images when they become active
            const img = slide.querySelector("img[data-src]");
            if (img && Math.abs(i - index) <= 1) {
              // Load current and adjacent slides
              img.src = img.dataset.src;
              img.removeAttribute("data-src");
            }
          });

          indicators.forEach((indicator, i) => {
            indicator.classList.remove("active");
            indicator.setAttribute("aria-selected", "false");
            indicator.setAttribute("tabindex", "-1");
          });

          // Add active class to current slide and indicator
          if (slides[index]) {
            slides[index].classList.add("active");
            slides[index].setAttribute("aria-hidden", "false");
          }
          if (indicators[index]) {
            indicators[index].classList.add("active");
            indicators[index].setAttribute("aria-selected", "true");
            indicators[index].setAttribute("tabindex", "0");
          }

          currentSlideIndex = index;

          // Announce slide change to screen readers
          const slideDescription =
            slides[index]?.getAttribute("aria-label") || `Slide ${index + 1}`;
          announceToScreenReader(`Now showing: ${slideDescription}`);
        }

        // Next slide
        function nextSlide() {
          const nextIndex = (currentSlideIndex + 1) % slides.length;
          showSlide(nextIndex);
        }

        // Previous slide
        function prevSlide() {
          const prevIndex =
            (currentSlideIndex - 1 + slides.length) % slides.length;
          showSlide(prevIndex);
        }

        // Start automatic slideshow
        function startSlideshow() {
          if (isPlaying) {
            slideInterval = setInterval(nextSlide, 4000); // Change slide every 4 seconds
          }
        }

        // Stop automatic slideshow
        function stopSlideshow() {
          clearInterval(slideInterval);
        }

        // Toggle play/pause with enhanced accessibility
        function togglePlayPause() {
          isPlaying = !isPlaying;

          if (isPlaying) {
            playPauseBtn.innerHTML =
              '<span aria-hidden="true">⏸</span><span class="sr-only">Pause</span>';
            playPauseBtn.setAttribute(
              "aria-label",
              "Pause automatic slideshow"
            );
            playPauseBtn.setAttribute("aria-pressed", "false");
            startSlideshow();
            announceToScreenReader("Slideshow resumed");
          } else {
            playPauseBtn.innerHTML =
              '<span aria-hidden="true">▶</span><span class="sr-only">Play</span>';
            playPauseBtn.setAttribute(
              "aria-label",
              "Resume automatic slideshow"
            );
            playPauseBtn.setAttribute("aria-pressed", "true");
            stopSlideshow();
            announceToScreenReader("Slideshow paused");
          }
        }

        // Screen reader announcement function
        function announceToScreenReader(message) {
          const announcement = document.createElement("div");
          announcement.setAttribute("aria-live", "polite");
          announcement.setAttribute("aria-atomic", "true");
          announcement.className = "sr-only";
          announcement.textContent = message;
          document.body.appendChild(announcement);

          // Remove after announcement
          setTimeout(() => {
            document.body.removeChild(announcement);
          }, 1000);
        }

        // Event listeners
        if (prevBtn) {
          prevBtn.addEventListener("click", () => {
            stopSlideshow();
            prevSlide();
            if (isPlaying) startSlideshow();
          });
        }

        if (nextBtn) {
          nextBtn.addEventListener("click", () => {
            stopSlideshow();
            nextSlide();
            if (isPlaying) startSlideshow();
          });
        }

        if (playPauseBtn) {
          playPauseBtn.addEventListener("click", togglePlayPause);
        }

        // Enhanced indicator click and keyboard events
        indicators.forEach((indicator, index) => {
          indicator.addEventListener("click", () => {
            stopSlideshow();
            showSlide(index);
            if (isPlaying) startSlideshow();
            indicator.focus();
          });

          // Enhanced keyboard navigation for indicators
          indicator.addEventListener("keydown", (e) => {
            switch (e.key) {
              case "ArrowLeft":
                e.preventDefault();
                const prevIndicator =
                  indicators[index - 1] || indicators[indicators.length - 1];
                prevIndicator.focus();
                prevIndicator.click();
                break;
              case "ArrowRight":
                e.preventDefault();
                const nextIndicator = indicators[index + 1] || indicators[0];
                nextIndicator.focus();
                nextIndicator.click();
                break;
              case "Home":
                e.preventDefault();
                indicators[0].focus();
                indicators[0].click();
                break;
              case "End":
                e.preventDefault();
                indicators[indicators.length - 1].focus();
                indicators[indicators.length - 1].click();
                break;
              case "Enter":
              case " ":
                e.preventDefault();
                indicator.click();
                break;
            }
          });
        });

        // Enhanced keyboard navigation
        document.addEventListener("keydown", (e) => {
          // Only handle keys when slideshow or its controls are focused
          if (
            e.target.closest(".mann-ki-baat-slideshow") ||
            e.target.classList.contains("nav-arrow") ||
            e.target.classList.contains("play-pause-btn") ||
            e.target.classList.contains("indicator")
          ) {
            switch (e.key) {
              case "ArrowLeft":
                e.preventDefault();
                stopSlideshow();
                prevSlide();
                if (isPlaying) startSlideshow();
                announceToScreenReader(
                  `Previous slide: ${slides[currentSlideIndex]?.getAttribute(
                    "aria-label"
                  )}`
                );
                break;
              case "ArrowRight":
                e.preventDefault();
                stopSlideshow();
                nextSlide();
                if (isPlaying) startSlideshow();
                announceToScreenReader(
                  `Next slide: ${slides[currentSlideIndex]?.getAttribute(
                    "aria-label"
                  )}`
                );
                break;
              case " ":
                // Only toggle if not focused on a button (to avoid double activation)
                if (!e.target.matches("button")) {
                  e.preventDefault();
                  togglePlayPause();
                }
                break;
              case "Home":
                e.preventDefault();
                stopSlideshow();
                showSlide(0);
                if (isPlaying) startSlideshow();
                break;
              case "End":
                e.preventDefault();
                stopSlideshow();
                showSlide(slides.length - 1);
                if (isPlaying) startSlideshow();
                break;
              case "Escape":
                // Stop slideshow and remove focus
                e.preventDefault();
                if (isPlaying) {
                  togglePlayPause();
                }
                e.target.blur();
                break;
            }
          }
        });

        // Pause on hover
        const slideshow = document.querySelector(".mann-ki-baat-slideshow");
        if (slideshow) {
          slideshow.addEventListener("mouseenter", stopSlideshow);
          slideshow.addEventListener("mouseleave", () => {
            if (isPlaying) startSlideshow();
          });
        }

        // Enhanced touch/swipe support for mobile with accessibility
        let touchStartX = 0;
        let touchEndX = 0;
        let touchStartY = 0;
        let touchEndY = 0;
        let isSwiping = false;

        if (slideshow) {
          slideshow.addEventListener(
            "touchstart",
            (e) => {
              touchStartX = e.changedTouches[0].screenX;
              touchStartY = e.changedTouches[0].screenY;
              isSwiping = false;
            },
            { passive: true }
          );

          slideshow.addEventListener(
            "touchmove",
            (e) => {
              const currentX = e.changedTouches[0].screenX;
              const currentY = e.changedTouches[0].screenY;
              const diffX = Math.abs(currentX - touchStartX);
              const diffY = Math.abs(currentY - touchStartY);

              // Determine if this is a horizontal swipe
              if (diffX > diffY && diffX > 10) {
                isSwiping = true;
                e.preventDefault(); // Prevent scrolling during swipe
              }
            },
            { passive: false }
          );

          slideshow.addEventListener(
            "touchend",
            (e) => {
              if (isSwiping) {
                touchEndX = e.changedTouches[0].screenX;
                touchEndY = e.changedTouches[0].screenY;
                handleSwipe();
              }
            },
            { passive: true }
          );
        }

        function handleSwipe() {
          const swipeThreshold = 50;
          const diffX = touchStartX - touchEndX;
          const diffY = Math.abs(touchStartY - touchEndY);

          // Only process horizontal swipes
          if (Math.abs(diffX) > swipeThreshold && diffY < 100) {
            stopSlideshow();

            if (diffX > 0) {
              // Swipe left - next slide
              nextSlide();
              announceToScreenReader(
                `Swiped to next slide: ${slides[
                  currentSlideIndex
                ]?.getAttribute("aria-label")}`
              );
            } else {
              // Swipe right - previous slide
              prevSlide();
              announceToScreenReader(
                `Swiped to previous slide: ${slides[
                  currentSlideIndex
                ]?.getAttribute("aria-label")}`
              );
            }

            if (isPlaying) startSlideshow();

            // Provide haptic feedback if available
            if (navigator.vibrate) {
              navigator.vibrate(50);
            }
          }
        }

        // Focus management for better accessibility
        function manageFocus() {
          // Trap focus within slideshow when using keyboard navigation
          const focusableElements = slideshow.querySelectorAll(
            'button, [tabindex]:not([tabindex="-1"])'
          );

          const firstFocusable = focusableElements[0];
          const lastFocusable = focusableElements[focusableElements.length - 1];

          slideshow.addEventListener("keydown", (e) => {
            if (e.key === "Tab") {
              if (e.shiftKey) {
                // Shift + Tab
                if (document.activeElement === firstFocusable) {
                  e.preventDefault();
                  lastFocusable.focus();
                }
              } else {
                // Tab
                if (document.activeElement === lastFocusable) {
                  e.preventDefault();
                  firstFocusable.focus();
                }
              }
            }
          });
        }

        // Initialize focus management
        if (slideshow) {
          manageFocus();
        }

        // Performance monitoring and error handling
        function initPerformanceMonitoring() {
          // Monitor image loading performance
          const imageLoadTimes = new Map();

          slides.forEach((slide, index) => {
            const img = slide.querySelector("img");
            if (img) {
              const startTime = performance.now();

              img.addEventListener("load", () => {
                const loadTime = performance.now() - startTime;
                imageLoadTimes.set(index, loadTime);

                // Log slow loading images (> 2 seconds)
                if (loadTime > 2000) {
                  console.warn(
                    `Slide ${index + 1} image loaded slowly: ${loadTime.toFixed(
                      2
                    )}ms`
                  );
                }
              });

              img.addEventListener("error", () => {
                console.error(`Failed to load image for slide ${index + 1}`);
                // Provide fallback or placeholder
                slide.style.backgroundColor = "#f0f0f0";
                slide.innerHTML +=
                  '<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: #666; text-align: center; padding: 1rem;"><p>Image unavailable</p><p style="font-size: 0.8rem;">Please check your connection</p></div>';
              });
            }
          });

          // Monitor slideshow performance
          let slideChangeCount = 0;
          const originalShowSlide = showSlide;

          showSlide = function (index) {
            const startTime = performance.now();
            originalShowSlide(index);
            const endTime = performance.now();

            slideChangeCount++;

            // Log slow slide transitions (> 100ms)
            if (endTime - startTime > 100) {
              console.warn(
                `Slow slide transition: ${(endTime - startTime).toFixed(2)}ms`
              );
            }
          };
        }

        // Initialize with error handling
        try {
          initSlideshow();
          initPerformanceMonitoring();

          // Report successful initialization
          if (window.performance && window.performance.mark) {
            performance.mark("slideshow-initialized");
          }
        } catch (error) {
          console.error("Failed to initialize slideshow:", error);

          // Provide fallback functionality
          if (slides.length > 0) {
            slides[0].classList.add("active");
            slides[0].setAttribute("aria-hidden", "false");
          }

          // Disable interactive controls if initialization fails
          [prevBtn, nextBtn, playPauseBtn].forEach((btn) => {
            if (btn) {
              btn.disabled = true;
              btn.setAttribute("aria-label", "Slideshow controls unavailable");
            }
          });
        }

        // News ticker functionality
        const newsTicker = document.querySelector(".news-ticker");
        if (newsTicker) {
          // Pause ticker animation on hover for better accessibility
          newsTicker.addEventListener("mouseenter", () => {
            newsTicker.style.animationPlayState = "paused";
          });

          newsTicker.addEventListener("mouseleave", () => {
            newsTicker.style.animationPlayState = "running";
          });

          // Pause ticker when user focuses on it (keyboard navigation)
          newsTicker.addEventListener("focusin", () => {
            newsTicker.style.animationPlayState = "paused";
          });

          newsTicker.addEventListener("focusout", () => {
            newsTicker.style.animationPlayState = "running";
          });
        }

        // 3-Container Rotating Gallery functionality
        const rotatingGallery = document.querySelector('.rotating-gallery-wrapper');
        const rotatingTrack = document.querySelector('.rotating-track');
        
        // Initialize rotating gallery
        function initRotatingGallery() {
          if (!rotatingGallery || !rotatingTrack) return;
          
          // Add click handlers to photo cards
          const photoCards = document.querySelectorAll('.photo-card');
          photoCards.forEach((card, index) => {
            card.addEventListener('click', () => {
              const title = card.querySelector('h4')?.textContent || `Photo ${index + 1}`;
              announceToScreenReader(`Clicked on: ${title}`);
            });
            
            // Add keyboard support
            card.setAttribute('tabindex', '0');
            card.addEventListener('keydown', (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
              }
            });
          });
          
          // Pause animation on focus for accessibility
          rotatingGallery.addEventListener('focusin', () => {
            rotatingTrack.style.animationPlayState = 'paused';
          });
          
          rotatingGallery.addEventListener('focusout', () => {
            rotatingTrack.style.animationPlayState = 'running';
          });
          
          // Announce gallery start
          announceToScreenReader('3-container rotating photo gallery initialized');
        }
        
        // Initialize the rotating gallery
        initRotatingGallery();
        
        // YouTube Video Player functionality
        let currentVideoModal = null;
        
        // Function to play YouTube video
        function playVideo(element) {
          const videoId = element.getAttribute('data-video-id');
          if (!videoId) return;
          
          // Create modal overlay
          const modal = document.createElement('div');
          modal.className = 'video-modal';
          modal.innerHTML = `
            <div class="video-modal-content">
              <div class="video-modal-header">
                <h3>Playing Video</h3>
                <button class="close-video" onclick="closeVideo()" aria-label="Close video">✕</button>
              </div>
              <div class="video-container">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1" 
                  title="YouTube video player" 
                  frameborder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowfullscreen>
                </iframe>
              </div>
            </div>
          `;
          
          // Add modal to page
          document.body.appendChild(modal);
          currentVideoModal = modal;
          
          // Prevent body scroll
          document.body.style.overflow = 'hidden';
          
          // Add click outside to close
          modal.addEventListener('click', (e) => {
            if (e.target === modal) {
              closeVideo();
            }
          });
          
          // Add escape key to close
          document.addEventListener('keydown', handleVideoEscape);
          
          // Announce to screen readers
          announceToScreenReader('Video player opened');
          
          // Focus the close button for accessibility
          setTimeout(() => {
            const closeBtn = modal.querySelector('.close-video');
            if (closeBtn) closeBtn.focus();
          }, 100);
        }
        
        // Function to close video modal
        function closeVideo() {
          if (currentVideoModal) {
            document.body.removeChild(currentVideoModal);
            currentVideoModal = null;
            document.body.style.overflow = '';
            document.removeEventListener('keydown', handleVideoEscape);
            announceToScreenReader('Video player closed');
          }
        }
        
        // Handle escape key for video modal
        function handleVideoEscape(e) {
          if (e.key === 'Escape') {
            closeVideo();
          }
        }
        
        // Make functions globally available
        window.playVideo = playVideo;
        window.closeVideo = closeVideo;
        
        // Enhanced photo gallery keyboard navigation (legacy support)
        const photoGallery = document.querySelector('.rail[tabindex="0"]');
        const galleryThumbs = document.querySelectorAll(".rail .thumb");

        if (photoGallery && galleryThumbs.length > 0) {
          let currentGalleryIndex = 0;

          // Set initial focus state
          galleryThumbs[0].setAttribute("tabindex", "0");
          for (let i = 1; i < galleryThumbs.length; i++) {
            galleryThumbs[i].setAttribute("tabindex", "-1");
          }

          photoGallery.addEventListener("keydown", (e) => {
            switch (e.key) {
              case "ArrowLeft":
                e.preventDefault();
                currentGalleryIndex = Math.max(0, currentGalleryIndex - 1);
                updateGalleryFocus();
                break;
              case "ArrowRight":
                e.preventDefault();
                currentGalleryIndex = Math.min(
                  galleryThumbs.length - 1,
                  currentGalleryIndex + 1
                );
                updateGalleryFocus();
                break;
              case "Home":
                e.preventDefault();
                currentGalleryIndex = 0;
                updateGalleryFocus();
                break;
              case "End":
                e.preventDefault();
                currentGalleryIndex = galleryThumbs.length - 1;
                updateGalleryFocus();
                break;
              case "Enter":
              case " ":
                e.preventDefault();
                galleryThumbs[currentGalleryIndex].click();
                break;
            }
          });

          function updateGalleryFocus() {
            // Update tabindex for all thumbnails
            galleryThumbs.forEach((thumb, index) => {
              thumb.setAttribute(
                "tabindex",
                index === currentGalleryIndex ? "0" : "-1"
              );
            });

            // Focus the current thumbnail
            galleryThumbs[currentGalleryIndex].focus();

            // Scroll into view if needed
            galleryThumbs[currentGalleryIndex].scrollIntoView({
              behavior: "smooth",
              block: "nearest",
              inline: "center",
            });
          }

          // Handle direct clicks on thumbnails
          galleryThumbs.forEach((thumb, index) => {
            thumb.addEventListener("click", () => {
              currentGalleryIndex = index;
              updateGalleryFocus();
              // Here you would typically open a modal or navigate to full image
              announceToScreenReader(
                `Viewing ${thumb.getAttribute("aria-label")}`
              );
            });

            thumb.addEventListener("focus", () => {
              currentGalleryIndex = index;
            });
          });
        }

        // Enhanced accessibility for service cards
        const serviceCards = document.querySelectorAll(".service");
        serviceCards.forEach((card) => {
          // Add keyboard support
          card.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              card.click();
            }
          });

          // Add focus indicators
          card.addEventListener("focus", () => {
            card.style.outline = "2px solid var(--brand-2)";
            card.style.outlineOffset = "2px";
          });

          card.addEventListener("blur", () => {
            card.style.outline = "none";
          });
        });

        // Accessibility improvements for utility bar buttons
        const a11yButtons = document.querySelectorAll(".a11y-group button");
        a11yButtons.forEach((button) => {
          button.addEventListener("click", (e) => {
            const action = button.getAttribute("title");
            announceToScreenReader(`${action} activated`);

            // Add visual feedback
            button.style.background = "var(--brand)";
            button.style.color = "white";

            setTimeout(() => {
              button.style.background = "";
              button.style.color = "";
            }, 200);
          });
        });

        // Performance optimization: Reduce motion for users who prefer it
        if (
          window.matchMedia &&
          window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
          // Disable animations for users who prefer reduced motion
          const style = document.createElement("style");
          style.textContent = `
            *, *::before, *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
              scroll-behavior: auto !important;
            }
            .news-ticker {
              animation: none !important;
            }
          `;
          document.head.appendChild(style);
        }

        // Add high contrast mode support
        if (
          window.matchMedia &&
          window.matchMedia("(prefers-contrast: high)").matches
        ) {
          document.body.classList.add("high-contrast");

          const highContrastStyle = document.createElement("style");
          highContrastStyle.textContent = `
            .high-contrast {
              --border: #000000;
              --shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
            }
            .high-contrast .nav-link:focus,
            .high-contrast .thumb:focus,
            .high-contrast button:focus {
              outline: 3px solid #000000 !important;
              outline-offset: 2px !important;
            }
          `;
          document.head.appendChild(highContrastStyle);
        }

        // Performance monitoring and reporting
        if ("PerformanceObserver" in window) {
          // Monitor Largest Contentful Paint (LCP)
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];

            if (lastEntry.startTime > 2500) {
              console.warn(`LCP is slow: ${lastEntry.startTime.toFixed(2)}ms`);
            }
          });

          try {
            lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });
          } catch (e) {
            // LCP not supported in this browser
          }

          // Monitor Cumulative Layout Shift (CLS)
          const clsObserver = new PerformanceObserver((list) => {
            let clsValue = 0;

            for (const entry of list.getEntries()) {
              if (!entry.hadRecentInput) {
                clsValue += entry.value;
              }
            }

            if (clsValue > 0.1) {
              console.warn(`CLS is high: ${clsValue.toFixed(4)}`);
            }
          });

          try {
            clsObserver.observe({ entryTypes: ["layout-shift"] });
          } catch (e) {
            // CLS not supported in this browser
          }
        }

        // Register service worker for better performance (if available)
        if ("serviceWorker" in navigator) {
          window.addEventListener("load", () => {
            // Only register if we have a service worker file
            // This is commented out as we don't have a service worker file yet
            /*
            navigator.serviceWorker.register('/sw.js')
              .then((registration) => {
                console.log('SW registered: ', registration);
              })
              .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
              });
            */
          });
        }

        // Final accessibility check and reporting
        setTimeout(() => {
          const accessibilityIssues = [];

          // Check for images without alt text
          const imagesWithoutAlt = document.querySelectorAll("img:not([alt])");
          if (imagesWithoutAlt.length > 0) {
            accessibilityIssues.push(
              `${imagesWithoutAlt.length} images missing alt text`
            );
          }

          // Check for buttons without labels
          const buttonsWithoutLabels = document.querySelectorAll(
            "button:not([aria-label]):not([aria-labelledby])"
          );
          const unlabeledButtons = Array.from(buttonsWithoutLabels).filter(
            (btn) => !btn.textContent.trim() && !btn.querySelector(".sr-only")
          );
          if (unlabeledButtons.length > 0) {
            accessibilityIssues.push(
              `${unlabeledButtons.length} buttons missing labels`
            );
          }

          // Check for headings hierarchy
          const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
          let previousLevel = 0;
          let hierarchyIssues = 0;

          headings.forEach((heading) => {
            const currentLevel = parseInt(heading.tagName.charAt(1));
            if (currentLevel > previousLevel + 1) {
              hierarchyIssues++;
            }
            previousLevel = currentLevel;
          });

          if (hierarchyIssues > 0) {
            accessibilityIssues.push(
              `${hierarchyIssues} heading hierarchy issues`
            );
          }

          // Report accessibility status
          if (accessibilityIssues.length === 0) {
            console.log(
              "✅ Accessibility check passed - no major issues found"
            );
          } else {
            console.warn("⚠️ Accessibility issues found:", accessibilityIssues);
          }

          // Performance summary
          if (window.performance && window.performance.timing) {
            const timing = window.performance.timing;
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            const domReady =
              timing.domContentLoadedEventEnd - timing.navigationStart;

            console.log(`📊 Performance Summary:
              - Page Load Time: ${loadTime}ms
              - DOM Ready: ${domReady}ms
              - Slideshow Initialized: ${
                performance.getEntriesByName("slideshow-initialized").length > 0
                  ? "✅"
                  : "❌"
              }
            `);
          }
        }, 2000);

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Add scroll effect to navbar
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 100) {
                navbar.style.background = 'linear-gradient(135deg, rgba(102, 126, 234, 0.95) 0%, rgba(118, 75, 162, 0.95) 100%)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                navbar.style.backdropFilter = 'none';
            }
        });
      });

      // ⚡ SUPERSONIC YOUTUBE VIDEO FUNCTIONALITY ⚡
      function openVideoModal(videoCard) {
        const videoId = videoCard.getAttribute('data-video-id');
        const modal = document.getElementById('videoModal');
        const iframe = document.getElementById('videoFrame');
        
        // Set YouTube embed URL with autoplay
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
        
        // Show modal with smooth animation
        modal.classList.add('active');
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Focus management for accessibility
        modal.focus();
        
        // Add escape key listener
        document.addEventListener('keydown', handleVideoEscape);
        
        // Announce to screen readers
        const videoTitle = videoCard.querySelector('.video-title').textContent;
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = `Playing video: ${videoTitle}`;
        document.body.appendChild(announcement);
        
        // Remove announcement after screen reader reads it
        setTimeout(() => {
          if (announcement.parentNode) {
            announcement.parentNode.removeChild(announcement);
          }
        }, 1000);
      }

      function closeVideoModal(event) {
        // Only close if clicking the modal background or close button
        if (event && event.target !== event.currentTarget && !event.target.classList.contains('modal-close')) {
          return;
        }
        
        const modal = document.getElementById('videoModal');
        const iframe = document.getElementById('videoFrame');
        
        // Hide modal
        modal.classList.remove('active');
        
        // Stop video by clearing src
        iframe.src = '';
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        // Remove escape key listener
        document.removeEventListener('keydown', handleVideoEscape);
        
        // Return focus to the video card that was clicked
        const activeVideoCard = document.querySelector('.video-card:focus');
        if (activeVideoCard) {
          activeVideoCard.focus();
        }
      }

      function handleVideoEscape(event) {
        if (event.key === 'Escape') {
          closeVideoModal();
        }
      }

      // Enhanced video card interactions
      document.addEventListener('DOMContentLoaded', function() {
        const videoCards = document.querySelectorAll('.video-card');
        
        videoCards.forEach(card => {
          // Add keyboard support
          card.setAttribute('tabindex', '0');
          card.setAttribute('role', 'button');
          card.setAttribute('aria-label', 'Play video: ' + card.querySelector('.video-title').textContent);
          
          // Keyboard activation
          card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              openVideoModal(this);
            }
          });
          
          // Enhanced hover effects
          card.addEventListener('mouseenter', function() {
            const playOverlay = this.querySelector('.play-overlay');
            playOverlay.style.transform = 'translate(-50%, -50%) scale(1.1)';
          });
          
          card.addEventListener('mouseleave', function() {
            const playOverlay = this.querySelector('.play-overlay');
            playOverlay.style.transform = 'translate(-50%, -50%) scale(1)';
          });
        });
        
        // Close modal when clicking outside video
        document.getElementById('videoModal').addEventListener('click', function(e) {
          if (e.target === this) {
            closeVideoModal();
          }
        });
        
        // Preload YouTube thumbnails for better performance
        const thumbnails = document.querySelectorAll('.video-thumbnail img');
        thumbnails.forEach(img => {
          const videoId = img.closest('.video-card').getAttribute('data-video-id');
          if (videoId) {
            // Preload high quality thumbnail
            const highQualityImg = new Image();
            highQualityImg.src = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
            
            // Fallback to medium quality if high quality fails
            highQualityImg.onerror = function() {
              img.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
            };
            
            highQualityImg.onload = function() {
              img.src = highQualityImg.src;
            };
          }
        });
      });

      // Performance optimization: Lazy load video thumbnails
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target;
              const videoCard = img.closest('.video-card');
              const videoId = videoCard.getAttribute('data-video-id');
              
              if (videoId && !img.src.includes('youtube.com')) {
                img.src = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
                img.onerror = function() {
                  this.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                };
              }
              
              observer.unobserve(img);
            }
          });
        });

        document.querySelectorAll('.video-thumbnail img').forEach(img => {
          imageObserver.observe(img);
        });
      }

      // Add smooth scrolling to video gallery when linked
      function scrollToVideoGallery() {
        const videoGallery = document.querySelector('.video-gallery');
        if (videoGallery) {
          videoGallery.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }

      // Analytics tracking for video plays (optional)
      function trackVideoPlay(videoId, videoTitle) {
        // Add your analytics tracking code here
        console.log(`Video played: ${videoTitle} (ID: ${videoId})`);
        
        // Example Google Analytics tracking
        if (typeof gtag !== 'undefined') {
          gtag('event', 'video_play', {
            'video_id': videoId,
            'video_title': videoTitle
          });
        }
      }

      // Enhanced error handling for video loading
      document.addEventListener('DOMContentLoaded', function() {
        const iframe = document.getElementById('videoFrame');
        
        iframe.addEventListener('error', function() {
          console.error('Video failed to load');
          const errorMessage = document.createElement('div');
          errorMessage.className = 'video-error';
          errorMessage.innerHTML = `
            <p>Sorry, this video could not be loaded.</p>
            <button onclick="closeVideoModal()">Close</button>
          `;
          iframe.parentNode.appendChild(errorMessage);
        });
      });